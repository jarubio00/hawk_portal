import axios from "axios";

/**
 * Avisos por WhatsApp vía UltraMsg, el mismo canal que usan los crons del
 * servidor.
 *
 * Se usa solo para avisos operativos internos. Nunca debe poder tumbar la
 * petición que lo dispara: los llamadores usan enviarAvisoWhatsapp, que traga
 * cualquier error y lo deja en el log.
 */

const ULTRAMSG_URL = "https://api.ultramsg.com/instance56455/messages/chat";

/**
 * Destino de los avisos operativos.
 *
 * WHATSAPP_AVISOS_DESTINO acepta un número (528115995194) o el id de un grupo
 * (...@g.us). Mientras se valida en producción apunta al número del
 * desarrollador; después se cambia al grupo de operaciones.
 */
function getDestino(): string | null {
  return process.env.WHATSAPP_AVISOS_DESTINO?.trim() || null;
}

/**
 * Manda el mensaje y devuelve si se logró.
 *
 * No lanza: un aviso perdido no puede costar un pedido. Si falta configuración
 * lo dice en el log una vez y sigue.
 */
export async function enviarAvisoWhatsapp(mensaje: string): Promise<boolean> {
  const token = process.env.ULTRAMSG_TOKEN?.trim();
  const destino = getDestino();

  if (!token || !destino) {
    console.error(
      "[whatsapp] falta ULTRAMSG_TOKEN o WHATSAPP_AVISOS_DESTINO; aviso no enviado"
    );
    return false;
  }

  try {
    await axios.post(
      ULTRAMSG_URL,
      new URLSearchParams({ token, to: destino, body: mensaje }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        timeout: 8000,
      }
    );
    return true;
  } catch (error: any) {
    console.error("[whatsapp] no se pudo enviar el aviso:", error?.message);
    return false;
  }
}
