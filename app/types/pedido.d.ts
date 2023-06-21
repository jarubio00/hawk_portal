import React from "react";


export interface Municipio {
    id: number;
    municipio: string;
    pais: string;
    estado: string;
    abrev: string;
}



export interface IRecoleccion {
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
}


export interface IDrawer {
    open: boolean | false;
    title?: string;
    tipo?: string;
}

export interface IPedido {
    recoleccion?: IRecoleccion;
    destino?: IDestino;
    paquete?: IPaquete;
    cobro?: Boolean;
    cobroCantidad?: number;
    programa?: IPrograma;
}


export type PedidoContextType = {
    pedido?: IPedido;
    saveRecoleccion: (recoleccion: IRecoleccion) => void;
    saveDestino: (destino: IDestino) => void;
    saveDestinoKey: (key: string, value: any) => void;
    activeStep: number;
    updateActiveStep: (step: number) => void;
    updateDireccionSelected: (id: number) => void;
    direccionSelected: number;
    updateDestinoSelected: (id: number) => void;
    destinoSelected: number;
    updatePaqueteSelected: (id: number) => void;
    savePaquete: (paq: IPaquete) => void;
    paqueteSelected: number;
    drawer?: IDrawer;
    useDrawer: (props: IDrawer) => void;
    saveCobro: (cantidad: number) => void;
    saveProgramaKey: (key: string, value: any) => void;
    tipoPrograma: string;
    updateTipoPrograma: (tipo: string) => void;
}