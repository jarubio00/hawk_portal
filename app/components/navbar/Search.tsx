'use client';
import { useCallback, useState } from "react";
import { BiSearch } from 'react-icons/bi';
import useTrackModal from "@/app/hooks/useTrackModal";


const Search = () => {
  const trackModal = useTrackModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    
      <div
        onClick={trackModal.onOpen}
        className="
          border-[1px] 
          w-full 
          py-1
          rounded-full 
          shadow-sm 
          hover:shadow-md 
          transition 
          cursor-pointer
        "
      >
          <div 
          className="
            flex 
            flex-row 
            items-center 
            justify-between
          "
          >
              
          
          <div 
            className="
            text-sm 
            font-normal
            px-6
            "
          >
            Rastrea tu paquete 
            </div>
            <div 
              className="
                p-2 
                mr-2
                bg-rose-500 
                rounded-full 
                text-white
              "
            >
              <BiSearch size={18} />
            </div>

          </div>
      </div>
      
    
  )
}

export default Search
