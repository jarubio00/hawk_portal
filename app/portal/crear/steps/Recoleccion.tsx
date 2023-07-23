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
import StepHeading from "../components/StepHeading";

interface RecoleccionStepProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  direcciones: any;
  append?: boolean;
  recoleccion?: any;
}

const RecoleccionStep: React.FC<RecoleccionStepProps> = ({ 
  label, 
  onClick, 
  disabled, 
  outline,
  small,
  icon: Icon,
  direcciones,
  append = false,
  recoleccion
}) => {

  const {updateActiveStep, 
    saveRecoleccion,
    pedido,
    updateDireccionSelected,
    useDrawer,
    direccionSelected} = useContext(PedidoContext) as PedidoContextType;

    console.log(append);
 
   const [direccion, setDireccion] = useState(null);
   
   const onSelectDireccion = (direccion: any) => {
    console.log(direccion);
    updateDireccionSelected(direccion.id);
    //setDireccion(direccion);
    saveRecoleccion(direccion);
   }

   useEffect(() => {
    direcciones.map((val: any) => {
      if (val.default) {
        updateDireccionSelected(val.id);
        saveRecoleccion(val);
      }
    })
   },[])

   useEffect(() => {
   
   },[])

  return ( 
   <div className="px-2">
    <StepHeading title="Recolección" subtitle={!append ?"Selecciona la dirección de recolección" : "No se puede modificar la dirección de recolección"} />
    <div className="flex mt-2">
       {!append && <div className="
          text-white flex-wrap
          font-semibold
          text-xs
          mb-4
          flex
          flex-row
          gap-1
          items-center
          cursor-pointer
          bg-blue-500
          hover:bg-blue-300
          rounded-md
          px-2
          py-1
          "
            onClick={() => useDrawer({open: true, title: 'Agregar dirección de recolección', tipo: 'addDireccion'})}
        >
          <FaPlus size={12} />
          <span>Agregar nueva dirección de recolección</span>
       </div>}
     </div>
    {!append && <Swiper
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
     </Swiper>}
     
     {pedido?.recoleccion && <div className="my-0 ">
        <DireccionCard data={pedido?.recoleccion} append={append}/>
     </div>}
     <div className="my-4"> 
        <Button 
          label='Siguiente'
          onClick={() => updateActiveStep(1)}
        />
     </div>
   </div>
   );
}
 
export default RecoleccionStep;