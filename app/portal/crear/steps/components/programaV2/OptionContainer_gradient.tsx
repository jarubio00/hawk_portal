"use client";

import { FaCheck } from "react-icons/fa";
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
          className={`relative flex flex-col w-[350px] border rounded-lg items-center justify-center p-[2px] gap-2 bg-white ${
            selected &&
            " bg-gradient-to-r from-[#ffb28c] via-pink-300 to-[#ef8380]"
          }`}
        >
          <div
            className={`w-full rounded-lg  p-2 flex flex-col justify-between items-center bg-white
          }`}
          >
            {children}
            {selected && (
              <div className="absolute top-[1px] right-[1px] flex items-center justify-center w-[15px] h-[15px] bg-[#ef8482] rounded-tr-md rounded-bl-sm ">
                <FaCheck className="text-white w-[10px] h-[10px]" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`relative flex flex-col w-[350px] border shadow-lg rounded-lg items-center justify-center p-2 gap-2  ${
            selected && " border-rose-500 border-2"
          }
          }`}
        >
          {children}
          {selected && (
            <div className="absolute top-[0px] right-[0px] flex items-center justify-center w-[15px] h-[15px] bg-[#ef8482] rounded-tr-md rounded-bl-sm ">
              <FaCheck className="text-white w-[10px] h-[10px]" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OptionContainer;
