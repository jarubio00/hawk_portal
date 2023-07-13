'use client';

import { PulseLoader } from "react-spinners";


const Loader = () => {
  return ( 
    <div
      className="
      fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden  flex flex-col items-center justify-center
      "
      >
        <PulseLoader
          size={25}
          color="#FF6B00"
        />
      </div>
   );
}
 
export default Loader;