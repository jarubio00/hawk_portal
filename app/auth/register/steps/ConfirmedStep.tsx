'use client';

import { useState } from "react";

interface ConfirmedStepProps {
 data?: string;
}

const ConfirmedStep: React.FC<ConfirmedStepProps> = ({
 data
}) => {

    

  
 return (
  <div className='m-0'>
    <div className=" text-neutral-400 my-4 text-center text-xs">
        Ingresa el código que hemos enviado a tu celular
    </div>
    <div>
        
    </div>
  </div>
 );
}

export default ConfirmedStep;