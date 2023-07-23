'use client';

import { IconType } from "react-icons";
import Button from "../Button";
import IconButton from "../IconButton";
import ScreenSizeUtil from "../utils/ScreenSize";

interface PageHeaderProps {
    title?: string;
    subtitle?: string;
    icon: IconType;
    buttonLabel?: string;
    buttonIcon?:  IconType;
    buttonAction: () => void;
    cancelIcon?: IconType;
    cancelAction: () => void;
    disabled?: boolean;
    adding: boolean;
    noButton?: boolean;
  }

  const PageHeader: React.FC<PageHeaderProps> = ({ 
    title,
    subtitle,
    buttonLabel,
    buttonIcon, 
    buttonAction,
    disabled,
    icon: Icon,
    cancelIcon,
    cancelAction,
    adding,
    noButton = false

  }) => {
   
  
    return (
      <>
        <div className="flex flex-col gap-1 pt-0">
            <div className="flex flex-row justify-between items-center py-4 px-4 md:px-6 w-full md:w-5/6 lg:w-3/4">
                <div className="flex flex-row gap-2 md:gap-6 items-center">
                    <div 
                        className="
                            hidden
                            md:block
                            p-2
                            md:p-3 
                            mr-0
                            bg-neutral-200
                            rounded-full 
                            text-rose-500
                            "
                    >
                         <Icon className="h-3 md:h-6 w-3 md:w-6" /> 
                    </div>
                    <div className="flex flex-col w-6/6 md:w-full">
                        <div className="text-lg md:text-xl font-bold">
                            {title}
                        </div>
                        <div className={`text-xs md:text-md ${adding ? "text-blue-500" : "text-neutral-500"} `}>
                            {subtitle}
                        </div>
                        {/* <ScreenSizeUtil /> */}
                    </div>
                </div>
                {!noButton && 
                <>
                <div className="hidden md:block ">
                    <Button 
                        label={adding ? "Cancelar" : "Crear"}
                        icon={adding ? cancelIcon : buttonIcon}
                        onClick={() => adding ? cancelAction() : buttonAction()}
                        disabled={disabled}
                    />
                </div>
                <div className="block md:hidden">
                    <IconButton 
                        icon={adding ? cancelIcon : buttonIcon}
                        small
                        onClick={() => adding ? cancelAction() : buttonAction()}
                        disabled={disabled}
                    />
                </div></>}
            </div>
            <div className="my-0 px-4">
                <hr />
            </div>
        </div>
        
           
      </>
    );
  }
  
  export default PageHeader;