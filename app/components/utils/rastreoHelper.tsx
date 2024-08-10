import { SafeOperaciones, SafePedido, SafeRastreo } from "@/app/types";

export function rastreoSanitizer(data: SafePedido) {
  const ops = data?.operaciones || {};
  const incis = data?.incidencias || [];
  const incisRecArray = incis.filter((inci) => inci.tipoId === 2);
  const incisEntArray = incis.filter((inci) => inci.tipoId == 3);

  const rastreo: SafeRastreo = {
    programado: true,
    programadoAt: data.createdAt,
    enRutaRec:
      ops.punteoRecoleccion ||
      ops.recolectado ||
      ops.punteoEntrega ||
      ops.entregado
        ? true
        : false,
    enRutaRecAt: ops.punteoRecoleccionAt ? ops.punteoRecoleccionAt : undefined,
    recolectado:
      ops.recolectado || ops.punteoEntrega || ops.entregado ? true : false,
    recolectadoAt: ops.recolectadoAt ? ops.recolectadoAt : undefined,
    enRutaEnt: ops.punteoEntrega || ops.entregado ? true : false,
    enRutaEntAt: ops.punteoEntregaAt ? ops.punteoEntregaAt : undefined,
    entregado: ops.entregado ? true : false,
    entregadoAt: ops.entregadoAt ? ops.entregadoAt : undefined,
    incidenciaRec: !incisRecArray.length || ops.recolectado ? false : true,
    incidenciaRecAt: incisRecArray ? incisRecArray[0]?.createdAt : undefined,
    incidenciaEnt: incisEntArray.length || ops.entregado ? true : false,
    incidenciaEntAt: incisEntArray ? incisRecArray[0]?.createdAt : undefined,
  };

  return rastreo;
}
