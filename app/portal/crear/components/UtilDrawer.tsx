'use client';

import { IconType } from "react-icons";
import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType, IDrawer} from "@/app/types/pedido"
import {Drawer} from "@material-tailwind/react";
import Button from "@/app/components/Button";
import { IoMdClose } from "react-icons/io";

interface UtilDrawerProps {
  props?: IDrawer;
  onClose: () => void;
  size: number;
  content: React.ReactNode;
}

//se quito w-full , se agregp px-2
const UtilDrawer: React.FC<UtilDrawerProps> = ({ 
  props = {open: false, title: '', tipo: 'none'},
  onClose,
  size,
  content
}) => {

const {useDrawer} = useContext(PedidoContext) as PedidoContextType;

  return ( 
    <Drawer
        placement="right"
        open={props.open}
        onClose={onClose}
        className="p-4 z-[9996]"
        size={size}
      >
        <div className="mb-0 flex items-center justify-between">
          <span className="text-md font-semibold">
            {props.title}
          </span>
          <div className="p-2 cursor-pointer" onClick={() => useDrawer({open: false})}><IoMdClose size={26}/></div>
        </div>
        <hr className="my-2"/>
        <div className="py-1">
            {content}
        </div>
      </Drawer>
   );
}
 
export default UtilDrawer;