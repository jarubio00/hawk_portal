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
    <div className="flex flex-col w-full">
      <DestinoForm />
    </div>
  );
};

export default NacionalDestinoStep;
