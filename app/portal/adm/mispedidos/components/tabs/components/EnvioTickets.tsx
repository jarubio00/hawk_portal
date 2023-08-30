'use client';

import { Button } from "@/components/ui/button";
import {IoCreateSharp} from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface EnvioTicketsProps {
 data?: any;
}

const EnvioTickets: React.FC<EnvioTicketsProps> = ({
 data
}) => {
 return (
  <div className='m-4 flex flex-col gap-6 w-full md:w-96'>
    <Select >
      <SelectTrigger className="w-full">
          <SelectValue placeholder="Asunto del ticket" />
      </SelectTrigger>
      <SelectContent className="z-[9999]">
          <SelectGroup>
              {/* <SelectLabel>Plastico</SelectLabel> */}
              <SelectItem value="sm">
                  <div className="flex flex-row items-center justify-between gap-2">
                      <p>Cambio de domicilio de recolección</p>
                     
                  </div>
              </SelectItem>
              <SelectItem value="md">
                  <div className="flex flex-row items-center justify-between gap-2">
                      <p>Cambio de domicilio de entrega</p>
                      
                  </div>
              </SelectItem>
              <SelectItem value="lg">
                  <div className="flex flex-row items-center justify-between gap-2">
                      <p>Cambio de fecha de recolección</p>
                      
                  </div>
              </SelectItem>
              
          </SelectGroup>
      </SelectContent>
    </Select>
    <div>
        <Button className="px-2 mt-6">
            <IoCreateSharp className="mr-2 h-4 w-4"/>Crear Ticket
        </Button>
    </div>
        
  </div>
 );
}

export default EnvioTickets;