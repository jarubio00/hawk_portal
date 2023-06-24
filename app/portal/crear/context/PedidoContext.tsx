'use client'

import { IRecoleccion, IDestino, IPedido, IPaquete, PedidoContextType, IDrawer, IPrograma, IProgramaState, ITimer} from "@/app/types/pedido.d";
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
  const [tipoPrograma, setTipoPrograma] = useState('auto');

  const [drawer, setDrawer] = useState<IDrawer>({
    open: false,
    title: '',
    tipo: 'none',
  });

  const [timer, setTimer] = useState<ITimer>({
    isOpen: false,
    time: null,
  });

  const [recoleccionState, setRecoleccionState] = useState<IProgramaState>()
  const [entregaState, setEntregaState] = useState<IProgramaState>();
  const [fechasBloqueadas, setFechasBloqueadas] = useState({});

  

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

  const savePrograma = (programa: IPrograma) => {
    setPedido({...pedido, programa: {
    fechaRecoleccion: programa.fechaRecoleccion,
    bloqueRecoleccion: programa.bloqueRecoleccion,
    fechaEntrega: programa.fechaEntrega,
    bloqueEntrega: programa.bloqueEntrega
    }});
  }

  const saveRecoleccionState = (state: IProgramaState) => {
    setRecoleccionState({...recoleccionState,
      am: state.am,
      pm: state.pm,
      show: state.show,
      enabled: state.enabled,
      startDate: state.startDate
    });
  }

  const saveEntregaState = (state: IProgramaState) => {
    setEntregaState({...entregaState,
      am: state.am,
      pm: state.pm,
      show: state.show,
      enabled: state.enabled,
      startDate: state.startDate
    });
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

  const saveProgramaKey = async (key: string, value: any) => {
   
    if(key && value && pedido) {
      setPedido({
        ...pedido,
        programa: {...pedido.programa, [key]: value}
  
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

  const updateTipoPrograma = (tipo: string) => {
    setTipoPrograma(tipo);
  }

  const useDrawer = (props: IDrawer) => {
    setDrawer(props);
  }

  const useTimer = (props: ITimer) => {
    setTimer(props);
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
        saveProgramaKey,
        savePrograma,
        saveRecoleccionState,
        saveEntregaState,
        entregaState,
        recoleccionState,
        updateTipoPrograma,
        tipoPrograma,
        useTimer,
        timer
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export default PedidoProvider;
