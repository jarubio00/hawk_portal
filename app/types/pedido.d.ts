import React from "react";
import { SafeRecoleccion } from ".";

export interface Municipio {
  id: number;
  municipio: string;
  pais: string;
  estado: string;
  abrev: string;
}

export interface IRecoleccion {
  direccionId?: number;
  direccionIcon: String;
  direccionColor: String;
  nombreDireccion: string;
  contactoNombre: string;
  contactoTel: string;
  cpId: number;
  calle: string;
  numero: string;
  numeroInt?: string;
  colonia: string;
  otraColonia?: boolean;
  municipioId: number;
  empresa?: string;
  referencias?: string;
  municipio?: Municipio;
}

export interface IDestino {
  contactoNombre?: string;
  contactoTel?: string;
  cpId?: number;
  calle?: string;
  numero?: string;
  numeroInt?: string;
  colonia?: string;
  otraColonia?: boolean;
  municipioId?: number;
  empresa?: string;
  referencias?: string;
  municipio?: Municipio;
  save?: boolean;
  sincp?: boolean;
  coloniasList?: [];
}

interface PaqTipo {
  id: number;
  tipo: string;
  desc: string;
}

export interface IPaquete {
  nombrePaquete?: string;
  paqAlto?: number;
  paqAncho?: number;
  paqLargo?: number;
  paqPeso?: number;
  paqPesoVol?: number;
  paqTipoId?: number;
  paqEmpaqueId?: number;
  paqContenido?: number;
  tipo?: PaqTipo;
  save?: boolean;
}

export interface IPrograma {
  fechaRecoleccion?: Datetime;
  bloqueRecoleccion?: number;
  fechaEntrega?: Datetime;
  bloqueEntrega?: number;
  mismoDia?: Boolean;
}

export interface IDrawer {
  open: boolean | false;
  title?: string;
  tipo?: string;
}

export interface ITimer {
  isOpen: boolean | false;
  time?: any;
}

export interface IProgramaState {
  am?: boolean | false;
  pm?: boolean | false;
  show?: boolean | false;
  enabled?: boolean;
  startDate?: any;
  recsB1?: boolean;
  recsB1Data?: any;
  recsB2?: boolean;
  recsB2Data?: any;
}

export interface IPedido {
  recoleccion?: IRecoleccion;
  destino?: IDestino;
  paquete?: IPaquete;
  cobro?: Boolean;
  cobroCantidad?: number;
  programa?: IPrograma;
  metodoPago?: IMetodoPago;
  cotizacion?: ICotizaItem;
  append?: IAppend;
}

export interface ICotizaParams {
  tipoProductoId?: number;
  municipioRecoleccionId?: number;
  municipioEntregaId?: number;
  paqPesoVol?: number;
  mismoDia?: Boolean;
}

export interface ICotizaItem {
  sku?: string;
  descripcion?: string;
  precio?: number;
  cantidad?: number;
}

export interface IMetodoPago {
  formaPagoId?: number;
  estatusPagoId?: number;
  comprobante?: boolean;
  comprobanteUrl?: string;
  comprobanteString?: string;
  comprobanteFileType?: string;
  comprobanteSelected?: boolean;
  comprobanteImageFile?: File;
  passed?: boolean;
  comprobanteError?: Boolean;
  comprobanteErrorMessage?: String;
}

export interface IAppend {
  enabled?: boolean;
  recoleccion?: SafeRecoleccion;
}

export type PedidoContextType = {
  pedido?: IPedido;
  resetContext: () => void;
  saveRecoleccion: (recoleccion: IRecoleccion) => void;
  saveDestino: (destino: IDestino) => void;
  saveDestinoKey: (key: string, value: any) => void;
  activeStep: number;
  updateActiveStep: (step: number) => void;
  updateDireccionSelected: (id: number) => void;
  direccionSelected: number;
  updateDestinoSelected: (id: number) => void;
  destinoSelected: number;
  updateDestinoSinCp: (value: boolean) => void;
  destinoSinCp: boolean;
  destinoCaptured?: boolean;
  updateDestinoCaptured: (value: boolean) => void;
  updatePaqueteSelected: (id: number) => void;
  savePaquete: (paq: IPaquete) => void;
  paqueteSelected: number;
  drawer?: IDrawer;
  useDrawer: (props: IDrawer) => void;
  saveCobro: (cantidad: number) => void;
  saveProgramaKey: (key: string, value: any) => void;
  savePrograma: (programa: IPrograma) => void;
  tipoPrograma: string;
  updateTipoPrograma: (tipo: string) => void;
  saveRecoleccionState: (state: IProgramaState) => void;
  saveEntregaState: (state: IProgramaState) => void;
  entregaState?: IProgramaState;
  recoleccionState?: IProgramaState;
  useTimer: (props: ITimer) => void;
  timer?: ITimer;
  saveMetodoPago: (metodo: IMetodoPago) => void;
  updateTipoPago: (tipo: string) => void;
  metodoPago?: IMetodoPago;
  tipoPago?: string;
  saveCotizacion: (cotiza: ICotizaItem) => void;
  saveAppend: (append: IAppend) => void;
  savePedidoInitial: (
    append: IAppend,
    programa: IPrograma,
    recoleccion: IRecoleccion
  ) => void;
  setProgramaRun: (val: number) => void;
  programaRun: number;
  saveProgramaAppend: (append: IAppend, programa: IPrograma) => void;
  tipoEntrega: string;
  updateTipoEntrega: (tipo: string) => void;
};
