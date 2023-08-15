'use client';

import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";

import Container from "@/app/components/Container";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt,FaClock } from 'react-icons/fa'
import { MdNightlightRound, MdLocationOn, MdViewInAr } from 'react-icons/md'
import {BsFillBoxSeamFill} from 'react-icons/bs'
import { IoMdClose } from "react-icons/io";
import { useState, useContext } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"

interface CrearNavbarProps {
  currentUser?: SafeUser | null;

  lastStep?: (e: any) => void;
  firstStep?: (e: any) => void;
  onClose?: (e: any) => void;
}

const CrearNavbar: React.FC<CrearNavbarProps> = ({
  currentUser,
  lastStep,
  firstStep,
  onClose
}) => {
  
  const {activeStep} = useContext(PedidoContext) as PedidoContextType;

  const router = useRouter();
  return ( 
    <div className="fixed w-full bg-white z-40 shadow-sm">
      <div
        className="
          py-4 
          border-b-[1px]
        "
      >
      <Container>
        <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
          "
        >
            <div className="cursor-pointer hidden md:block" onClick={onClose}><IoMdClose size={24} /></div>
            <div className="w-full md:w-3/4 py-0 pl-2">
                <Stepper
                activeStep={activeStep}
                activeLineClassName="bg-rose-500"
                >
                    <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
                        <FaHome className="h-4 w-4" />
                    </Step>
                    <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
                        <MdLocationOn className="h-5 w-5" />
                    </Step>
                    <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
                        <MdViewInAr className="h-5 w-5" />
                    </Step>
                    <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
                        <FaClock className="h-5 w-5" />
                    </Step>
                    <Step activeClassName="bg-rose-500" completedClassName="bg-rose-500" className="w-8 h-8 ring-rose-200" onClick={() => {}}>
                        <BsFillBoxSeamFill className="h-5 w-5" />
                    </Step>
                </Stepper>
            </div>
            <div className="cursor-pointer hidden md:block"></div>
          
        </div>
      </Container>
    </div>
  </div>
  );
}


export default CrearNavbar;