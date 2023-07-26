'use client';

import { Button } from "@/components/ui/button";
import {IoCreateSharp} from "react-icons/io5";


interface EnvioTicketsProps {
 data?: any;
}

const EnvioTickets: React.FC<EnvioTicketsProps> = ({
 data
}) => {
 return (
  <div className='m-8'>
    <Button className="px-2">
        <IoCreateSharp className="mr-2 h-4 w-4"/>Crear Ticket
    </Button>
        
  </div>
 );
}

export default EnvioTickets;