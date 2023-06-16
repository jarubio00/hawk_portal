'use client'

import { IRecoleccion, IDestino, IPedido, IPaquete, PedidoContextType, IDrawer} from "@/app/types/pedido.d";
import React, { useState, createContext } from "react";


export const PedidoContext = createContext<PedidoContextType | null>(null);

interface Props {
  children: React.ReactNode;
}
const PedidoProvider: React.FC<Props> = ({children}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [direccionSelected, setDireccionSelected] = useState(0);
  const [destinoSelected, setDestinoSelected] = useState(0);
  const [paqueteSelected, setPaqueteSelected] = useState(0);
  const [pedido, setPedido] = useState<IPedido>();
  const [recoleccion, setRecoleccion] = useState<IRecoleccion>();
  const [drawer, setDrawer] = useState<IDrawer>({
    open: false,
    title: '',
    tipo: 'none',
  });

  

  const saveRecoleccion = (rec: IRecoleccion) => {
    setPedido({...pedido,recoleccion: {
      nombreDireccion: rec.nombreDireccion,
      contactoNombre: rec.contactoNombre,
      contactoTel: rec.contactoTel,
      cpId: rec.cpId,
      calle: rec.calle,
      numero: rec.numero,
      numeroInt: rec.numeroInt,
      colonia: rec.colonia,
      otraColonia: rec.otraColonia,
      municipioId: rec.municipio ? rec.municipio.id : 99,
      empresa: rec.empresa,
      referencias: rec.referencias,
      municipio: rec.municipio
    }});
  }

  const saveDestino = (dest: IDestino) => {
    setPedido({...pedido,destino: {
      contactoNombre: dest.contactoNombre,
      contactoTel: dest.contactoTel,
      cpId: dest.cpId,
      calle: dest.calle,
      numero: dest.numero,
      numeroInt: dest.numeroInt,
      colonia: dest.colonia,
      otraColonia: dest.otraColonia,
      municipioId: dest.municipio ? dest.municipio.id : 99,
      empresa: dest.empresa,
      referencias: dest.referencias,
      municipio: dest.municipio,
      save: dest.save,
      sincp: dest.sincp
    }});
  }

  const savePaquete = (paq: IPaquete) => {
    setPedido({...pedido, paquete: {
      nombrePaquete: paq.nombrePaquete,
      paqAlto: paq.paqAlto,
      paqAncho: paq.paqAncho,
      paqLargo: paq.paqLargo,
      paqPeso: paq.paqPeso,
      paqPesoVol: paq.paqPesoVol,
      paqTipoId: paq.paqTipoId,
      paqEmpaqueId: paq.paqEmpaqueId,
      paqContenido: paq.paqContenido,
      tipo: paq.tipo,
      save: paq.save
    }});
  }

  const saveDestinoKey = (key: string, value: any) => {
    if(key && value) {
      setPedido({
        ...pedido,
        destino: {...pedido?.destino, [key]: value}
  
      })
    }
    
  }

  const saveCobro = (cantidad: number) => {
    if(cantidad && cantidad > 0) {
      setPedido({
        ...pedido,
        cobro: true,
        cobroCantidad: cantidad
      })
    } else {
      setPedido({
        ...pedido,
        cobro: false,
        cobroCantidad: 0
      })
    }
  }

  const updateActiveStep = (step: number) => {
    setActiveStep(step);
  }

  const updateDireccionSelected = (id: number) => {
    setDireccionSelected(id);
  }

  const updateDestinoSelected = (id: number) => {
    setDestinoSelected(id);
  }

  const updatePaqueteSelected = (id: number) => {
    setPaqueteSelected(id);
  }

  const useDrawer = (props: IDrawer) => {
    setDrawer(props);
  }

  return (
    <PedidoContext.Provider
      value={{
        pedido,
        saveRecoleccion,
        saveDestino,
        saveDestinoKey,
        updateActiveStep,
        activeStep,
        updateDireccionSelected,
        direccionSelected,
        updateDestinoSelected,
        destinoSelected,
        updatePaqueteSelected,
        paqueteSelected,
        savePaquete,
        saveCobro,
        drawer,
        useDrawer,

      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;
