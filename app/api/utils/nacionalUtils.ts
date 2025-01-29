export async function confirmNacionalShipment(response: any) {
  //console.log(response.statusCode);
  //console.log(response.data.carrierTrackingNumber);

  const code = response.statusCode;
  const number = response.data.carrierTrackingNumber;

  if (code && number) {
    return true;
  }

  return false;
}

export async function crearHawkPedidoNacional(p: any, currentUser: any) {
  //console.log(response.statusCode);
  //console.log(response.data.carrierTrackingNumber);

  const pedidoCrear = {
    clienteId: currentUser.id,
    fechaEntrega: p.programa.fechaEntrega,
    bloqueEntrega: parseInt(p.programa?.bloqueEntrega),
    entregaContactoNombre: p.destino?.contactoNombre,
    entregaContactoTel: p.destino?.contactoTel,
    entregaCpId: parseInt(p.destino?.cpId),
    entregaCalle: p.destino?.calle,
    entregaNumero: p.destino?.numero,
    entregaNumeroInt: p.destino?.numeroInt,
    entregaColonia: p.destino?.colonia,
    entregaOtraColonia: p.destino?.otraColonia,
    entregaMunicipioId: p.destino?.municipioId,
    entregaEmpresa: p.destino?.empresa,
    entregaReferencias: p.destino?.referencias,
    paqTipoId: parseInt(p.paquete?.paqTipoId),
    paqAncho: parseFloat(p.paquete?.paqAncho),
    paqLargo: parseFloat(p.paquete?.paqLargo),
    paqAlto: parseFloat(p.paquete?.paqAlto),
    paqPeso: parseFloat(p.paquete?.paqPeso),
    paqContenido: p.paquete?.paqContenido,
    paqPesoVol: parseFloat(p.paquete?.paqPesoVol),
    precioVenta: parseFloat(p.cotizacion?.precio),
    formaPagoId: parseInt(p.metodoPago?.formaPagoId),
    comprobante: p.metodoPago?.comprobante,
    comprobanteUrl: p.metodoPago?.comprobanteUrl,
    cobroDestino: p.cobro || false,
    cobroDestinoCantidad: p.cobroCantidad ? parseFloat(p.cobroCantidad) : 0,
    operaciones: {
      create: {
        punteoRecoleccion: false,
      },
    },
  };
}
