/**
 * Cierre diario del servicio de mismo día a las 8:00.
 *
 * Versión revisada del script que ya corre en el servidor. Los cambios:
 *
 *   1. No vuelve a cerrar lo que ya está cerrado. Antes insertaba en
 *      BloqueoServicios sin preguntar, así que durante los meses en que el
 *      servicio estuvo bloqueado por rangos largos sumó una fila diaria sobre
 *      un bloqueo existente y anunció en el grupo el cierre de algo que llevaba
 *      semanas cerrado. Ahora el portal también puede cerrar el día al alcanzar
 *      el límite, así que este caso pasa a ser normal, no excepcional.
 *
 *   2. Manejo de errores. Antes cualquier fallo abortaba el cierre en silencio.
 *
 *   3. Token de UltraMsg por variable de entorno, no en el código.
 *
 *   4. Se elimina bloqueaMismoDia(): llamaba a apiv2 para generar evidencias con
 *      Playwright, que ya no se usan. El bloqueo real es la fila en
 *      BloqueoServicios, que es lo que lee el portal.
 *
 *   5. Se elimina el `if (dayNumber != 6 || dayNumber != 0)`, que era siempre
 *      verdadero y no filtraba nada. El comportamiento no cambia: se sigue
 *      cerrando todos los días. Es inofensivo porque sábado y domingo no hay
 *      mismo día que cerrar, y cambiarlo merece su propia decisión.
 *
 * Requiere ULTRAMSG_TOKEN.
 */

const query = require("../../../db/db-connection-scripts");
const axios = require("axios");
const qs = require("qs");

// --- Configuración ---------------------------------------------------------

const ULTRAMSG_URL = "https://api.ultramsg.com/instance56455/messages/chat";

const GRUPO_OPERACIONES = "120363418005940156@g.us";
const NUMERO_PRUEBAS = "528115995194";

/** Ver la nota de destino en reporte-transferencias.js */
const DESTINO = process.env.REPORTE_DESTINO || NUMERO_PRUEBAS;

// --- Acceso a datos --------------------------------------------------------

/** El helper de la casa devuelve undefined en vez de lanzar cuando MySQL falla. */
async function consultar(etiqueta, sql, params) {
  const filas = await query(sql, params);

  if (!Array.isArray(filas)) {
    throw new Error(
      `La consulta "${etiqueta}" no devolvió filas. Revisa el error de MySQL en el log.`
    );
  }

  return filas;
}

/** Fecha de hoy según el reloj de la base, no el de Node. */
async function fechaDeHoy() {
  const filas = await consultar(
    "fecha de hoy",
    `SELECT DATE_FORMAT(NOW(),'%Y-%m-%d') AS hoy`
  );
  return filas[0].hoy;
}

async function contarMismoDia(fecha) {
  const sql = `
    SELECT SUM(IF(p.mismo_dia = 1 AND p.estatus_id != 5, 1, 0)) AS mismoDia
    FROM pedidos p
    INNER JOIN recolecciones r ON p.recoleccion_id = r.id
    WHERE r.fecha BETWEEN ? AND ?`;

  const filas = await consultar("conteo de mismo día", sql, [
    `${fecha} 00:00:00`,
    `${fecha} 23:59:59`,
  ]);

  return parseInt(filas[0].mismoDia) || 0;
}

async function yaEstaCerrado(fecha) {
  const sql = `
    SELECT id FROM hawk_prisma.BloqueoServicios
    WHERE fecha = ? AND servicio IN ('MD','TODO')
    LIMIT 1`;

  const filas = await consultar("bloqueo existente", sql, [fecha]);
  return filas.length > 0;
}

async function cerrarServicio(fecha) {
  await consultar(
    "cierre de mismo día",
    `INSERT INTO hawk_prisma.BloqueoServicios (fecha, servicio, createdBy) VALUES (?, ?, ?)`,
    [fecha, "MD", 1]
  );
}

async function registrarBitacora(fecha, cantidad) {
  await consultar(
    "bitácora zia_md",
    `INSERT INTO zia_md (fecha, mdAtCreated) VALUES (?, ?)`,
    [fecha, cantidad]
  );
}

// --- Envío -----------------------------------------------------------------

async function enviarWhatsapp(mensaje) {
  const token = process.env.ULTRAMSG_TOKEN;
  if (!token) throw new Error("Falta la variable de entorno ULTRAMSG_TOKEN");

  return axios({
    method: "post",
    url: ULTRAMSG_URL,
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: qs.stringify({ token, to: DESTINO, body: mensaje }),
  });
}

const pausa = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// --- Entrada ---------------------------------------------------------------

async function main() {
  const fecha = await fechaDeHoy();
  const md = await contarMismoDia(fecha);

  if (await yaEstaCerrado(fecha)) {
    // Puede haberlo cerrado el límite del portal, o ser parte de un bloqueo
    // largo configurado por operaciones. En ninguno de los dos casos tiene
    // sentido volver a anunciarlo.
    console.log(
      `${new Date().toISOString()} -- ${fecha} ya estaba cerrado (${md} servicios). Sin acción.`
    );
    return;
  }

  await registrarBitacora(fecha, md);

  await enviarWhatsapp(
    `*Mensaje de Hawk IA Agent*\n \n La cantidad de servicios MismoDia es de *${md}* a las *8:00AM*`
  );
  await pausa(1000);
  await enviarWhatsapp("Cerrando servicio mismo día...");

  await cerrarServicio(fecha);
  await pausa(3000);
  await enviarWhatsapp("✅✅ Servicio mismo dia cerrado.");

  console.log(
    `${new Date().toISOString()} -- ${fecha} cerrado con ${md} servicios.`
  );
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(
      new Date().toISOString(),
      "-- el cierre de mismo día falló:",
      error
    );
    try {
      await enviarWhatsapp(
        `⚠️ *El cierre de mismo día falló*\n\n${error.message}`
      );
    } catch (errorAviso) {
      console.error("-- tampoco se pudo avisar por WhatsApp:", errorAviso.message);
    }
    process.exit(1);
  }
})();
