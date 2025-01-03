"use client";

import { Button } from "@/components/ui/button";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import DestinoForm from "../components/DestinoForm";

interface NacionalDestinoStepProps {
  data?: string;
}

const NacionalDestinoStep: React.FC<NacionalDestinoStepProps> = ({ data }) => {
  const { activeStep, updateActiveStep } = useNacionalCrearStore();
  return (
    <div className="w-full flex flex-col gap-0 items-center ">
      <div className="w-3/4 flex flex-col gap-4 items-center ">
        <DestinoForm />
      </div>
    </div>
  );
};

export default NacionalDestinoStep;
