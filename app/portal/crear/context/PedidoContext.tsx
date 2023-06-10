'use client'

import { IRecoleccion, IDestino, IPedido, PedidoContextType, IDrawer} from "@/app/types/pedido.d";
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
      contactoNombre: rec.contactoNombre,
      contactoTel: rec.contactoTel,
      cpId: rec.cpId,
      calle: rec.calle,
      numero: rec.numero,
      numeroInt: rec.numeroInt,
      colonia: rec.colonia,
      otraColonia: rec.otraColonia,
      municipioId: rec.municipioId,
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
      municipioId: dest.municipioId,
      empresa: dest.empresa,
      referencias: dest.referencias,
      municipio: dest.municipio,
      save: dest.save
    }});
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
        updateActiveStep,
        activeStep,
        updateDireccionSelected,
        direccionSelected,
        updateDestinoSelected,
        destinoSelected,
        updatePaqueteSelected,
        paqueteSelected,
        drawer,
        useDrawer
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;
