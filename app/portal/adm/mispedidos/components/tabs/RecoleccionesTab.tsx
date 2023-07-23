'use client'
import { useContext, useState } from "react";

import {namedDate, namedDateString} from '@/app/components/utils/helpers';

import { Badge } from "@/components/ui/badge";
import {MdAccessTimeFilled, MdCancel} from 'react-icons/md'
import {HiCheckCircle} from 'react-icons/hi'
import Activas from "./components/Activas";
import Completadas from "./components/Completadas";
import Canceladas from "./components/Canceladas";



interface RecoleccionesTabProps {
data?: any;
}

const RecoleccionesTab: React.FC<RecoleccionesTabProps> =  ({
  data
}) => {
  
  const [filter, setFilter] = useState('activas');
  const [completadasOrder, setCompletadasOrder] = useState('desc');

  const changeFilter = (filter: string) => {
    setFilter(filter);
  }

  const handleCompletadasOrder = (order: string) => {
    setCompletadasOrder(order);
  }

  
 
  return ( 
    <div className=" w-full py-2 flex flex-col gap-2">
      <div className="my-4 flex flex-row items-center gap-4 overflow-x-auto touch-auto no-scrollbar">
        <Badge 
          variant={filter == 'activas' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('activas')}
          >
          <MdAccessTimeFilled />
          Activas
        </Badge>
        <Badge 
          variant={filter == 'completadas' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('completadas')}
          >
          <HiCheckCircle />
          Completadas
        </Badge>
        <Badge 
          variant={filter == 'canceladas' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('canceladas')}
          >
          <MdCancel />
          Canceladas
        </Badge>
        <Badge 
          variant={filter == 'canceladas' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('canceladas')}
          >
          <MdCancel />
          Canceladas
        </Badge>
        <Badge 
          variant={filter == 'canceladas' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('canceladas')}
          >
          <MdCancel />
          Canceladas
        </Badge>
        
      </div>

     {/*  {filter === 'activas' && 
        <Activas />}
      {filter === 'completadas' && 
        <Completadas displayOrder={completadasOrder} setOrder={handleCompletadasOrder}/>}
      {filter === 'canceladas' && 
        <Canceladas />} */}
       
    </div>
   );
}
 
export default RecoleccionesTab;