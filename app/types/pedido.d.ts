import React from "react";


export interface Municipio {
    id: number;
    municipio: string;
    pais: string;
    estado: string;
    abrev: string;
}



export interface IRecoleccion {
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
    contactoNombre: string;
    contactoTel: string;
    cpId: number;
    calle: string;
    numero: string;
    numeroInt: string;
    colonia: string;
    otraColonia: boolean;
    municipioId: number;
    empresa: string;
    referencias: string;
    save: boolean;
}



export interface IDrawer {
    open: boolean | false;
    title?: string;
    tipo?: string;
}

export interface IPedido {
    recoleccion?: IRecoleccion;
    destino?: IDestino;
}


export type PedidoContextType = {
    pedido?: IPedido;
    saveRecoleccion: (recoleccion: IRecoleccion) => void;
    saveDestino: (destino: IDestino) => void;
    activeStep: number;
    updateActiveStep: (step: number) => void;
    updateDireccionSelected: (id: number) => void;
    direccionSelected: number;
    drawer?: IDrawer;
    useDrawer: (props: IDrawer) => void;
}