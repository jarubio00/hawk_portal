'use client';

import { PulseLoader } from "react-spinners";
import useLoader from "@/app/hooks/useLoader";

const GlobalLoader = () => {
  
  const loader = useLoader();


  return ( 
    <>
    { loader.isOpen && <div
      className="
      fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-[9999] overflow-hidden bg-white/25 backdrop-blur-sm flex flex-col items-center justify-center
      "
      >
       
          <PulseLoader
            size={10}
            color="#FF6B00"
          />
 
      </div>}
    </>
   );
}
 
export default GlobalLoader;