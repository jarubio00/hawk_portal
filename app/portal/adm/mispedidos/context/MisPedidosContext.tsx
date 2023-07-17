'use client'

import { Recoleccion, Pedido, User } from "@prisma/client";
import React, { useState, createContext } from "react";


export type MisPedidosContextType = {
  recolecciones?: any,
  pedidos?: any,
  saveRecolecciones: (recs: Recoleccion[]) => void;
  savePedidos: (pedidos: Pedido[]) => void;
}

export const MisPedidosContext = createContext<MisPedidosContextType | null>(null);


interface Props {
  children: React.ReactNode;
}
const MisPedidosProvider: React.FC<Props> = ({children}) => {

  const [pedidos, setPedidos] = useState<Pedido>();
  const [recolecciones, setRecolecciones] = useState<Recoleccion>();

 

  const saveRecolecciones = (recs: any) => {
    setRecolecciones(recs);
  }

  const savePedidos = (pedidos: any) => {
    setPedidos(pedidos);
  }

  return (
    <MisPedidosContext.Provider
      value={{
        recolecciones,
        pedidos,
        savePedidos,
        saveRecolecciones
      }}
    >
      {children}
    </MisPedidosContext.Provider>
  );
}

export default MisPedidosProvider;
