"use client";

import { FaArrowRight, FaPlus, FaPlusCircle } from "react-icons/fa";

interface CrearNextButtonProps {
  last?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const CrearNextButton: React.FC<CrearNextButtonProps> = ({
  last = false,
  disabled = false,
  onClick,
}) => {
  return (
    <button
      //className={`w-full mx-4 p-2 rounded-md bg-gradient-to-r from-orange-400 via-orange-800 to-rose-500`}
      //className={`w-full mx-4 p-2 rounded-md bg-gradient-to-r from-orange-400 via-rose-500 to-orange-900`}
      className={`w-full p-3 rounded-sm  shadow-lg  ${
        disabled
          ? "bg-gray-400 bg-gradient-to-r from-gray-300 via-gray-300 to-gray-300 shadow-none cursor-not-allowed"
          : "bg-gradient-to-r from-pink-600 via-rose-500 to-orange-900"
      }`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="flex flex-row gap-2 items-center justify-center">
        <div
          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
            disabled && "border-gray-400"
          }`}
        >
          {!last ? (
            <FaArrowRight
              className={` h-3 w-3 ${
                disabled ? "text-gray-400" : "text-white"
              }`}
            />
          ) : (
            <FaPlus
              className={` h-3 w-3 ${
                disabled ? "text-gray-400" : "text-white"
              }`}
            />
          )}
        </div>
        <p
          className={`text-sm  ${
            disabled ? "text-gray-400 italic" : "text-white"
          }`}
        >
          {!last ? "Siguiente" : "Crear envío"}
        </p>
      </div>
    </button>
  );
};

export default CrearNextButton;
