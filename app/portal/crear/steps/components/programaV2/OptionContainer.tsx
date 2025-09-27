"use client";

import { FaCheck } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { useProgramaStore } from "../../../store/crear-store";

interface OptionContainerProps {
  children: React.ReactNode;
  selected: Boolean;
}

export const OptionContainer: React.FC<OptionContainerProps> = ({
  children,
  selected = false,
}) => {
  const { avisoActivo, backgroundColor, backgroundImage, text1 } =
    useProgramaStore();
  const avisoClass = backgroundColor ? `border-[${backgroundColor}]` : "";
  //  style={{ backgroundColor: backgroundColor ?? "#FFF", opacity: 1 }}

  return (
    <div>
      {!avisoActivo ? (
        <div
          className={`relative flex flex-col w-[350px] border rounded-md items-center justify-center  gap-2 bg-white p-2 ${
            selected && " border-2  "
          }`}
        >
          {children}
          {selected && (
            <div className="absolute -top-[8px] -right-[8px] flex items-center justify-center  rounded-full bg-white ">
              <FaCircleCheck className="text-green-500 w-[16px] h-[16px]" />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`relative flex flex-col w-[350px] border shadow-lg rounded-lg items-center justify-center p-2 gap-2  ${
            selected && "border-2"
          }
          }`}
        >
          {children}
          {selected && (
            <div className="absolute -top-[8px] -right-[8px] flex items-center justify-center  rounded-full bg-white ">
              <FaCircleCheck className="text-green-500 w-[16px] h-[16px]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionContainer;
