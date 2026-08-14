/**
 * Reporte diario de envíos por transferencia.
 *
 * Corre a las 9:35, después de que cierra el periodo operativo de 9:30.
 * Deliberadamente NO se integró al cron de mismo día: ese cierra un servicio
 * comercial con horario duro y no tiene manejo de errores, así que cualquier
 * consulta nueva ahí se vuelve otra forma de impedir el cierre.
 *
 * Reporta tres cosas que responden preguntas distintas:
 *
 *   1. GENERADOS      Vigila que sigan sin poder crearse envíos de
 *                     transferencia sin comprobante. "Sin comprobante" debe
 *                     ser 0 todos los días; si no lo es, algo se rompió.
 *   2. CONFIRMACIÓN   Mide el trabajo de validación del periodo.
 *   3. BACKLOG        Lo único que detecta rezago. Confirmar 400 de 410
 *                     diarios se ve sano mientras el atraso crece 10 por día.
 *
 * Notas de zona horaria (verificado 2026-08-14):
 *   Pedidos.createdAt lo genera MySQL y está en hora local de México.
 *   Pedidos.updatedAt lo genera Prisma y está en UTC.
 * Por eso la ventana se calcula con el reloj de la base, no con el de Node.
 *
 * Requiere la variable de entorno ULTRAMSG_TOKEN.
 */

const query = require("../../../db/db-connection-scripts");
const axios = require("axios");
const qs = require("qs");

// --- Configuración ---------------------------------------------------------

const ULTRAMSG_URL = "https://api.ultramsg.com/instance56455/messages/chat";

const GRUPO_OPERACIONES = "120363418005940156@g.us";
const NUMERO_PRUEBAS = "528115995194";

/**
 * Destino del reporte.
 *
 * Mientras se valida en producción va al número personal. Para publicarlo al
 * grupo, cambiar el default a GRUPO_OPERACIONES — es un cambio deliberado de
 * una línea, no algo que dependa de acordarse de exportar una variable.
 *
 * REPORTE_DESTINO permite sobreescribirlo sin tocar el archivo.
 */
const DESTINO = process.env.REPORTE_DESTINO || NUMERO_PRUEBAS;

/**
 * Días hacia atrás que cubre el backlog de confirmación.
 *
 * No puede ser "toda la historia": el sistema legacy empezó a escribir
 * estatusPagoId = 3 apenas ahora, así que todo lo anterior figura como sin
 * confirmar y el número no significaría nada. Cuando haya varias semanas de
 * datos, subir este valor o cambiarlo por la fecha de arranque.
 */
const BACKLOG_DIAS = 30;

/** Máximo de envíos que se listan en el detalle antes de solo contarlos. */
const MAX_DETALLE = 15;

const FORMA_PAGO_TRANSFERENCIA = 2;
const ESTATUS_PAGO_CONFIRMADO = 3;

// --- Ventana del periodo ---------------------------------------------------

/**
 * Devuelve el periodo operativo cerrado más reciente (9:30 → 9:30).
 *
 * Se calcula en SQL a propósito: createdAt vive en el reloj de MySQL, así que
 * cualquier cálculo en Node arrastraría el desfase de 6 horas del servidor.
 * El IF cubre las corridas manuales antes de las 9:30, que si no tomarían un
 * periodo que todavía no cierra.
 */
async function obtenerPeriodo() {
  const sql = `
    SELECT
      IF(NOW() >= CONCAT(CURDATE(), ' 09:30:00'),
         CONCAT(CURDATE(), ' 09:30:00'),
         CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' 09:30:00')) AS fin,
      IF(NOW() >= CONCAT(CURDATE(), ' 09:30:00'),
         CONCAT(DATE_SUB(CURDATE(), INTERVAL 1 DAY), ' 09:30:00'),
         CONCAT(DATE_SUB(CURDATE(), INTERVAL 2 DAY), ' 09:30:00')) AS inicio,
      NOW() AS relojBd`;

  const filas = await query(sql);
  return filas[0];
}

// --- Consultas del reporte -------------------------------------------------

async function generadosEnPeriodo(inicio, fin) {
  const sql = `
    SELECT
      COUNT(*) AS total,
      SUM(CASE WHEN p.comprobanteUrl IS NULL OR TRIM(p.comprobanteUrl) = ''
               THEN 1 ELSE 0 END) AS sinComprobante,
      SUM(CASE WHEN p.estatusPagoId = ? THEN 1 ELSE 0 END) AS confirmados,
      COALESCE(SUM(p.precioVenta), 0) AS monto
    FROM hawk_prisma.Pedidos p
    WHERE p.formaPagoId = ?
      AND p.createdAt >= ? AND p.createdAt < ?`;

  const filas = await query(sql, [
    ESTATUS_PAGO_CONFIRMADO,
    FORMA_PAGO_TRANSFERENCIA,
    inicio,
    fin,
  ]);
  return filas[0];
}

/**
 * Envíos con comprobante que siguen sin confirmarse, de cualquier fecha dentro
 * de la ventana del backlog. Los que no tienen comprobante se excluyen porque
 * ya se reportan aparte y no hay nada que confirmar en ellos.
 */
async function backlogSinConfirmar() {
  const sql = `
    SELECT
      COUNT(*) AS total,
      COALESCE(SUM(p.precioVenta), 0) AS monto,
      MIN(p.createdAt) AS masAntiguo,
      DATEDIFF(NOW(), MIN(p.createdAt)) AS diasMasAntiguo
    FROM hawk_prisma.Pedidos p
    WHERE p.formaPagoId = ?
      AND p.estatusPagoId <> ?
      AND p.comprobanteUrl IS NOT NULL AND TRIM(p.comprobanteUrl) <> ''
      AND p.createdAt >= DATE_SUB(NOW(), INTERVAL ? DAY)`;

  const filas = await query(sql, [
    FORMA_PAGO_TRANSFERENCIA,
    ESTATUS_PAGO_CONFIRMADO,
    BACKLOG_DIAS,
  ]);
  return filas[0];
}

async function idMasAntiguoSinConfirmar() {
  const sql = `
    SELECT p.id
    FROM hawk_prisma.Pedidos p
    WHERE p.formaPagoId = ?
      AND p.estatusPagoId <> ?
      AND p.comprobanteUrl IS NOT NULL AND TRIM(p.comprobanteUrl) <> ''
      AND p.createdAt >= DATE_SUB(NOW(), INTERVAL ? DAY)
    ORDER BY p.createdAt ASC
    LIMIT 1`;

  const filas = await query(sql, [
    FORMA_PAGO_TRANSFERENCIA,
    ESTATUS_PAGO_CONFIRMADO,
    BACKLOG_DIAS,
  ]);
  return filas.length ? filas[0].id : null;
}

/** Solo se consulta cuando el conteo salió distinto de cero. */
async function detalleSinComprobante(inicio, fin) {
  const sql = `
    SELECT p.id, p.clienteId, p.precioVenta
    FROM hawk_prisma.Pedidos p
    WHERE p.formaPagoId = ?
      AND (p.comprobanteUrl IS NULL OR TRIM(p.comprobanteUrl) = '')
      AND p.createdAt >= ? AND p.createdAt < ?
    ORDER BY p.id
    LIMIT ?`;

  return query(sql, [FORMA_PAGO_TRANSFERENCIA, inicio, fin, MAX_DETALLE]);
}

// --- Formato ---------------------------------------------------------------

function dinero(valor) {
  return `$${Math.round(Number(valor) || 0).toLocaleString("es-MX")}`;
}

/** "2026-08-13 09:30:00" -> "13/ago 09:30" */
function etiquetaFecha(valorSql) {
  const meses = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
  const [fecha, hora] = String(valorSql).replace("T", " ").split(" ");
  const [, mes, dia] = fecha.split("-");
  return `${dia}/${meses[parseInt(mes, 10) - 1]} ${hora.slice(0, 5)}`;
}

function componerMensaje({ periodo, generados, backlog, backlogId, detalle }) {
  const total = Number(generados.total) || 0;
  const sinComprobante = Number(generados.sinComprobante) || 0;
  const confirmados = Number(generados.confirmados) || 0;
  const sinConfirmar = total - confirmados;
  const pctConfirmados = total > 0 ? Math.round((confirmados / total) * 100) : 0;

  const lineas = [];

  lineas.push(
    `*Transferencias — periodo ${etiquetaFecha(periodo.inicio)} → ${etiquetaFecha(periodo.fin)}*`
  );
  lineas.push("");

  lineas.push("*GENERADOS EN EL PERIODO*");
  lineas.push(`Envíos: *${total}*   ${dinero(generados.monto)}`);
  lineas.push(
    sinComprobante === 0
      ? "Sin comprobante: *0* ✅"
      : `⚠️ Sin comprobante: *${sinComprobante}*`
  );

  if (sinComprobante > 0 && detalle.length) {
    for (const envio of detalle) {
      lineas.push(`   • #${envio.id} · cliente ${envio.clienteId} · ${dinero(envio.precioVenta)}`);
    }
    if (sinComprobante > detalle.length) {
      lineas.push(`   • ...y ${sinComprobante - detalle.length} más`);
    }
  }

  lineas.push("");
  lineas.push("*CONFIRMACIÓN DEL PERIODO*");
  if (total === 0) {
    lineas.push("Sin envíos que confirmar");
  } else {
    lineas.push(`Confirmados: *${confirmados}*   (${pctConfirmados}%)`);
    lineas.push(`Sin confirmar: *${sinConfirmar}*`);
  }

  lineas.push("");
  lineas.push(`*BACKLOG* (últimos ${BACKLOG_DIAS} días)`);
  const backlogTotal = Number(backlog.total) || 0;
  if (backlogTotal === 0) {
    lineas.push("Sin pendientes de confirmar ✅");
  } else {
    lineas.push(`Sin confirmar: *${backlogTotal}*   ${dinero(backlog.monto)}`);
    const dias = Number(backlog.diasMasAntiguo) || 0;
    lineas.push(
      `Más antiguo: *${dias} día${dias === 1 ? "" : "s"}*` +
        (backlogId ? `   (#${backlogId})` : "")
    );
  }

  return lineas.join("\n");
}

// --- Envío -----------------------------------------------------------------

async function enviarWhatsapp(destino, mensaje) {
  const token = process.env.ULTRAMSG_TOKEN;
  if (!token) throw new Error("Falta la variable de entorno ULTRAMSG_TOKEN");

  return axios({
    method: "post",
    url: ULTRAMSG_URL,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify({ token, to: destino, body: mensaje }),
  });
}

// --- Entrada ---------------------------------------------------------------

async function main() {
  const periodo = await obtenerPeriodo();

  const generados = await generadosEnPeriodo(periodo.inicio, periodo.fin);
  const backlog = await backlogSinConfirmar();
  const backlogId = Number(backlog.total) > 0 ? await idMasAntiguoSinConfirmar() : null;

  const detalle =
    Number(generados.sinComprobante) > 0
      ? await detalleSinComprobante(periodo.inicio, periodo.fin)
      : [];

  const mensaje = componerMensaje({ periodo, generados, backlog, backlogId, detalle });

  await enviarWhatsapp(DESTINO, mensaje);

  console.log(
    `${periodo.relojBd} -- reporte enviado: ${generados.total} transferencias, ` +
      `${generados.sinComprobante} sin comprobante, backlog ${backlog.total}`
  );
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    // Un cron que falla en silencio es peor que uno que no existe: el grupo
    // asumiría que "no hubo mensaje" significa "no hubo nada que reportar".
    console.error(new Date().toISOString(), "-- reporte de transferencias falló:", error);
    try {
      await enviarWhatsapp(
        DESTINO,
        `⚠️ *El reporte de transferencias falló*\n\n${error.message}`
      );
    } catch (errorAviso) {
      console.error("-- tampoco se pudo avisar por WhatsApp:", errorAviso.message);
    }
    process.exit(1);
  }
})();
