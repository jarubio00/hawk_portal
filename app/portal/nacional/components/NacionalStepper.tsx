"use client";
import { Stepper, Step } from "@material-tailwind/react";
import { FaCog, FaPlus, FaHome, FaMapMarkedAlt, FaClock } from "react-icons/fa";
import { MdNightlightRound, MdLocationOn, MdViewInAr } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface NacionalStepperProps {
  data?: string;
}

const NacionalStepper: React.FC<NacionalStepperProps> = ({ data }) => {
  const { activeStep } = useNacionalCrearStore();
  return (
    <div className="w-full px-12">
      <div
        className="
        py-4 
        
      "
      >
        <div
          className="
          flex 
          flex-row 
          items-center 
          justify-between
          gap-3
          md:gap-0
        "
        >
          <div className="w-full py-0 pl-2">
            <Stepper activeStep={activeStep} activeLineClassName="bg-rose-500">
              <Step
                activeClassName="bg-rose-500"
                completedClassName="bg-rose-500"
                className="w-8 h-8 ring-rose-200"
                onClick={() => {}}
              >
                <FaHome className="h-4 w-4" />
              </Step>
              <Step
                activeClassName="bg-rose-500"
                completedClassName="bg-rose-500"
                className="w-8 h-8 ring-rose-200"
                onClick={() => {}}
              >
                <MdLocationOn className="h-5 w-5" />
              </Step>

              <Step
                activeClassName="bg-rose-500"
                completedClassName="bg-rose-500"
                className="w-8 h-8 ring-rose-200"
                onClick={() => {}}
              >
                <BsFillBoxSeamFill className="h-5 w-5" />
              </Step>
            </Stepper>
          </div>
          <div className="cursor-pointer hidden md:block"></div>
        </div>
      </div>
    </div>
  );
};

export default NacionalStepper;
