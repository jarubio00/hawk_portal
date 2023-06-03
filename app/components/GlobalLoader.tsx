'use client';

import { PulseLoader } from "react-spinners";
import useLoader from "@/app/hooks/useLoader";

const GlobalLoader = () => {
  
  const loader = useLoader();


  return ( 
    <>
    { loader.isOpen && <div
      className="
      fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-white/25 flex flex-col items-center justify-center
      "
      >
        <PulseLoader
          size={18}
          color="#F43F5E"
        />
      </div>}
    </>
   );
}
 
export default GlobalLoader;