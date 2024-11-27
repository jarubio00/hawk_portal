"use client";

import { FaShoppingCart } from "react-icons/fa";
import { GiMexico } from "react-icons/gi";
import { RiShoppingCartLine } from "react-icons/ri";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface NacionalHeaderProps {
  data?: string;
}

const NacionalHeader: React.FC<NacionalHeaderProps> = ({ data }) => {
  const { total } = useNacionalCrearStore();
  return (
    <div className="flex flex-row h-20 w-full px-6 py-2 bg-neutral-900 shadow-lg justify-between items-center text-white">
      <div className="flex flex-row gap-2 items-center">
        <GiMexico className="text-white h-6 w-6 md:h-8 md:w-8 " />
        <p className="text-lg md:text-xl ">Envíos Nacionales</p>
      </div>
      <div className="flex flex-row gap-2 items-center">
        <RiShoppingCartLine
          size={22}
          className="text-rose-500 h-6 w-6  mb-[3px]"
          //className="text-rose-500 h-8 w-8 drop-shadow-[0_5px_5px_rgba(255,255,255,.8)] mb-1"
        />
        <p className="text-[20px] font-semibold">${total}.00</p>
      </div>
    </div>
  );
};

export default NacionalHeader;
