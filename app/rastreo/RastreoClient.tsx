"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import EnvioRastreo from "../portal/adm/mispedidos/components/tabs/components/EnvioRastreo";

interface RastreoClientProps {
  data?: number;
}

const RastreoClient: React.FC<RastreoClientProps> = ({ data }) => {
  const [id, setId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [go, setGo] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (data && data > 1) {
      setId(data);
      setGo(false);
      setError(false);
      setErrorMessage("");

      setIsLoading(true);

      if (data < 1000000 || data > 9999999) {
        setErrorMessage("Número de guía inválido");
        setError(true);
        console.log("id inválido");
        return;
      }

      const timer = setTimeout(() => {
        setGo(true);
      }, 300);
    }
  }, [data]);

  const handleRastrear = () => {
    setGo(false);
    setError(false);
    setErrorMessage("");
    if (!id) {
      setErrorMessage("Se requiere el número de guía");
      setError(true);
      return;
    }

    setIsLoading(true);

    if (id < 1000000 || id > 9999999) {
      setErrorMessage("Número de guía inválido");
      setError(true);
      console.log("id inválido");
      return;
    }

    const timer = setTimeout(() => {
      setGo(true);
    }, 300);
    //setId(2000003);
  };

  return (
    <div className="my-8 w-full flex flex-col  items-center justify-center">
      <div className="w-3/4 md:w-[380px] flex flex-col items-center justify-center gap-4">
        <div className="w-full flex flex-col">
          <Input
            defaultValue={data}
            type={"number"}
            placeholder="Ingresa el número de guía"
            disabled={false}
            onChange={(event: any) => {
              setId(event.target.value);
            }}
            className={`${
              error ? "border-red-500 border-2" : "border-gray-900"
            } `}
          />
          <p className="text-red-500 text-xs">{errorMessage}</p>
        </div>

        <Button className={`w-32 `} onClick={handleRastrear}>
          Rastrear
        </Button>
      </div>
      <div className="my-8">{go && <EnvioRastreo id={id} />}</div>
    </div>
  );
};

export default RastreoClient;
