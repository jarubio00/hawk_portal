"use client";

import { Button } from "@/components/ui/button";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";
import ConfirmarCard from "../components/ConfirmarCard";

interface NacionalConfirmarStepProps {
  data?: string;
}

const NacionalConfirmarStep: React.FC<NacionalConfirmarStepProps> = ({
  data,
}) => {
  const { destinoSelected, updateActiveStep } = useNacionalCrearStore();
  return (
    <div className="flex flex-col gap-12 w-full items-center">
      <ConfirmarCard />

      <div className="flex flex-row mx-12 justify-between items-center">
        <p></p>
        <div className="flex flex-row gap-6">
          <Button
            variant="outline"
            className="w-30 ml-6"
            size={"lg"}
            onClick={() => updateActiveStep(2)}
          >
            Atras
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NacionalConfirmarStep;
