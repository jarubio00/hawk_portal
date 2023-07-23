'use client';
import { useContext, useState } from "react";

import {namedDate, namedDateString} from '@/app/components/utils/helpers';

import { Badge } from "@/components/ui/badge";
import {MdAccessTimeFilled, MdCancel} from 'react-icons/md'
import {HiCheckCircle} from 'react-icons/hi'
import Activas from "./components/Activas";
import Completadas from "./components/Completadas";
import Canceladas from "./components/Canceladas";
import EnviosDisplay from "./components/EnviosDisplay";

interface EnviosTabProps {
data?: any;
}

const EnviosTab: React.FC<EnviosTabProps> = ({
  data
}) => {
  const [filter, setFilter] = useState('1');
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
          variant={filter == '1' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('1')}
          >
          <MdAccessTimeFilled />
          Activos
        </Badge>
        <Badge 
          variant={filter == '2' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('3')}
          >
          <HiCheckCircle />
          Completados
        </Badge>
        <Badge 
          variant={filter == '3' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('4')}
          >
          <MdCancel />
          Cancelados
        </Badge>
        <Badge 
          variant={filter == '4' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('4')}
          >
          <MdCancel />
          Otras
        </Badge>
        <Badge 
          variant={filter == '5' ? 'default' : 'secondary'} 
          className="cursor-pointer  gap-1"
          onClick={() => changeFilter('5')}
          >
          <MdCancel />
          mas
        </Badge>
        
      </div>
      <EnviosDisplay filter={filter}/>
    </div>
   );
}
 
export default EnviosTab;