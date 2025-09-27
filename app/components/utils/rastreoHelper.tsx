import {
  SafeOperaciones,
  SafePedido,
  SafeRastreo,
  SafeIncidencia,
} from "@/app/types";

export function rastreoSanitizer(data: SafePedido) {
  const ops = data?.operaciones || {};
  const incis = data?.incidencias || [];
  const incisRecArray = incis.filter((inci) => inci.tipoId === 2);
  const incisEntArray = incis.filter((inci) => inci.tipoId == 3);

  let motivoRec = "";
  let tsRec = new Date();
  let leyendaRec = "";
  let cantidadRec = incisRecArray.length;
  let motivoEnt = "";
  let tsEnt = new Date();
  let leyendaEnt = "";
  let cantidadEnt = incisEntArray.length;

  if (cantidadRec === 1) {
    leyendaRec = "1era visita sin éxito";
    tsRec = incisRecArray[0]?.createdAt ?? tsRec;
    motivoRec = incisRecArray[0]?.motivo?.motivo ?? motivoRec;
  } else if (cantidadRec === 2) {
    leyendaRec = "2da visita sin éxito";
    tsRec = incisRecArray[1]?.createdAt ?? tsRec;
    motivoRec = incisRecArray[1]?.motivo?.motivo ?? motivoRec;
  } else if (cantidadRec === 3) {
    leyendaRec = "3era visita sin éxito";
    tsRec = incisRecArray[2]?.createdAt ?? tsRec;
    motivoRec = incisRecArray[2]?.motivo?.motivo ?? motivoRec;
  } else if (cantidadRec > 3) {
    leyendaRec = `Visita ${cantidadRec} sin éxito`;
    tsRec = incisRecArray[cantidadRec - 1]?.createdAt ?? tsRec;
    motivoRec = incisRecArray[cantidadRec - 1]?.motivo?.motivo ?? motivoRec;
  }

  if (cantidadEnt === 1) {
    leyendaEnt = "1era visita sin éxito";
    tsEnt = incisEntArray[0]?.createdAt ?? tsEnt;
    motivoEnt = incisEntArray[0]?.motivo?.motivo ?? motivoEnt;
  } else if (cantidadEnt === 2) {
    leyendaEnt = "2da visita sin éxito";
    tsEnt = incisEntArray[1]?.createdAt ?? tsEnt;
    motivoEnt = incisEntArray[1]?.motivo?.motivo ?? motivoEnt;
  } else if (cantidadEnt === 3) {
    leyendaEnt = "3era visita sin éxito";
    tsEnt = incisEntArray[2]?.createdAt ?? tsEnt;
    motivoEnt = incisEntArray[2]?.motivo?.motivo ?? motivoEnt;
  } else if (cantidadEnt > 3) {
    leyendaEnt = `Visita ${cantidadEnt} sin éxito`;
    tsEnt = incisEntArray[cantidadEnt - 1]?.createdAt ?? tsEnt;
    motivoEnt = incisEntArray[cantidadEnt - 1]?.motivo?.motivo ?? motivoEnt;
  }

  const rastreo: SafeRastreo = {
    estatusGuia: data?.estatusPedidoId,
    programado: true,
    programadoAt: data.createdAt,
    enRutaRec:
      ops.punteoRecoleccion ||
      cantidadRec >= 1 ||
      ops.recolectado ||
      ops.punteoEntrega ||
      ops.entregado
        ? true
        : false,
    enRutaRecAt: ops.punteoRecoleccionAt ? ops.punteoRecoleccionAt : undefined,
    recolectado:
      ops.recolectado || ops.punteoEntrega || ops.entregado ? true : false,
    recolectadoAt: ops.recolectadoAt ? ops.recolectadoAt : undefined,
    enRutaEnt:
      ops.punteoEntrega || ops.entregado || cantidadEnt >= 1 ? true : false,
    enRutaEntAt: ops.punteoEntregaAt ? ops.punteoEntregaAt : undefined,
    entregado: ops.entregado ? true : false,
    entregadoAt: ops.entregadoAt ? ops.entregadoAt : undefined,
    incidenciaRec: !incisRecArray.length || ops.recolectado ? false : true,
    cantidadInciRec: cantidadRec,
    motivoUltimaInciRec: motivoRec,
    timeStampUltimaInciRec: tsRec,
    leyendaInciRec: leyendaRec,
    incidenciaEnt: !incisEntArray.length || ops.entregado ? false : true,
    cantidadInciEnt: cantidadEnt,
    motivoUltimaInciEnt: motivoEnt,
    timeStampUltimaInciEnt: tsEnt,
    leyendaInciEnt: leyendaEnt,
  };

  return rastreo;
}
