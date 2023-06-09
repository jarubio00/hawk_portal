'use client';
import { useContext, useEffect, useState } from "react";
import AgregarDireccion from "@/app/components/portal/AgregarDireccion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import { IconType } from "react-icons";
import DireccionSlideCard from "../components/DireccionSlideCard";
import "swiper/css";
import "swiper/css/pagination";
import "./styles.css";

import DireccionCard from "../components/DireccionCard";
import {PedidoContext} from "../context/PedidoContext"
import {PedidoContextType, IRecoleccion} from "@/app/types/pedido"
import Button from "@/app/components/Button";
import {FaPlus} from 'react-icons/fa'

interface RecoleccionStepProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  direcciones: any;
}

const RecoleccionStep: React.FC<RecoleccionStepProps> = ({ 
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  icon: Icon,
  direcciones
}) => {

  const {updateActiveStep, 
    saveRecoleccion,
    pedido,
    updateDireccionSelected,
    useDrawer,
    direccionSelected} = useContext(PedidoContext) as PedidoContextType;

 
   const [direccion, setDireccion] = useState(null);
   
   const onSelectDireccion = (direccion: any) => {
    updateDireccionSelected(direccion.id);
    //setDireccion(direccion);
    saveRecoleccion(direccion);
   }

   /* useEffect(() => {
    direcciones.map((val: any) => {
      if (val.default) {
        updateDireccionSelected(val.id);
        setDireccion(val);
      }
    })
   },[]) */

  return ( 
   <div className="px-2">
    <div className="flex flex-col">
      <span className="text-xl font-black ">Recolección</span>
      <span className="text-sm text-bold text-neutral-400">Selecciona tu dirección de recolección</span>
    </div>
    <Swiper
        slidesPerView={2.5}
        spaceBetween={10}
        pagination={{
          clickable: true,
          
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          768: {
            slidesPerView: 3.5
          },
          1200: {
            slidesPerView: 4.5
          }
        }}
      >
        {direcciones.map((dir: any,i: number) => {

          return (
              <SwiperSlide key={i}>
                <DireccionSlideCard data={dir} onClick={onSelectDireccion} selected={direccionSelected === dir.id}/>
              </SwiperSlide>
          )
        })}   
     </Swiper>
     <div className="text-blue-500 font-semibold text-xs mb-4 flex flex-row gap-1 items-center cursor-pointer"
          onClick={() => useDrawer({open: true, title: 'Agregar dirección de recolección', tipo: 'addDireccion'})}
      >
        <FaPlus size={12} />
        <span>Agregar nueva dirección de recolección</span>
     </div>
     {pedido?.recoleccion && <div className="my-0 ">
        <DireccionCard data={pedido?.recoleccion}/>
     </div>}
     <div className="my-4"> 
        <Button 
          label='Continuar'
          onClick={() => updateActiveStep(4)}
        />
     </div>
   </div>
   );
}
 
export default RecoleccionStep;