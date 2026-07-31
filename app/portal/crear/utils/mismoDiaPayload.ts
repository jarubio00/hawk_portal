import { IPedido } from "@/app/types/pedido";

export interface MismoDiaDireccionPayload {
  cpId?: number;
  colonia?: string;
  otraColonia?: boolean;
}

export interface MismoDiaPayload {
  recoleccion: MismoDiaDireccionPayload;
  entrega: MismoDiaDireccionPayload;
}

/**
 * Datos que necesita el servidor para validar el servicio de entrega el mismo
 * dia (cp y colonia de ambos extremos). Se manda sin valores por default a
 * proposito: si falta algo el servidor deshabilita el servicio.
 */
export function buildMismoDiaPayload(pedido?: IPedido): MismoDiaPayload {
  return {
    recoleccion: {
      cpId: pedido?.recoleccion?.cpId,
      colonia: pedido?.recoleccion?.colonia,
      otraColonia: pedido?.recoleccion?.otraColonia,
    },
    entrega: {
      cpId: pedido?.destino?.cpId,
      colonia: pedido?.destino?.colonia,
      otraColonia: pedido?.destino?.otraColonia,
    },
  };
}
