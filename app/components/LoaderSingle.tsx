'use client';

import { PulseLoader } from "react-spinners";

interface LoaderSingleProps {
 size?: string;
}

const LoaderSingle: React.FC<LoaderSingleProps> = ({
 size = 12
}) => {
 return (

     <PulseLoader
          size={size}
          color="#FF6B00"
        />

 );
}

export default LoaderSingle;
