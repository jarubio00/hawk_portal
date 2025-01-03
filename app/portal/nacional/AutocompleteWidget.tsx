"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useLoadScript } from "@react-google-maps/api";

import { Input } from "@/components/ui/input";
import useLoader from "@/app/hooks/useLoader";
import { MdClear } from "react-icons/md";
import { useNacionalCrearStore } from "../store/nacional/nacionalCrear/nacional-crear";
import { nacionalCpFind } from "@/app/actions/apiQuerys";
import { MoonLoader, PulseLoader } from "react-spinners";

const libraries: any[] = ["places"];

interface AutocompleteWidgetProps {
  data?: string;
  disabled?: boolean;
}

const AutocompleteWidget: React.FC<AutocompleteWidgetProps> = ({
  data,
  disabled = false,
}) => {
  const {
    direccionesLoading,
    cpValue,
    municipioValue,
    updateCpValue,
    updateMunicipioValue,
    cpFound,
    updateCpFound,
    cpSelected,
    updateCpSelected,
  } = useNacionalCrearStore();
  const [input, setInput] = useState({});
  const [cpInput, setCpInput] = useState("");
  const [municipioInput, setMunicipioInput] = useState("");
  const [cpLoading, setCpLoading] = useState(false);

  const loader = useLoader();

  useEffect(() => {
    if (loader.isOpen) {
      loader.onClose();
    }
  }, []);

  const handleChange = async (val: any) => {
    updateCpValue(val);
    updateMunicipioValue("");

    if (val.length == 5) {
      setCpLoading(true);

      try {
        const cpFind = await nacionalCpFind(parseInt(val).toString());
        if (cpFind.statusCode === 200) {
          updateCpSelected(cpFind.data);
          updateMunicipioValue(cpFind.data.municipio);
          const timer = setTimeout(() => {
            setCpLoading(false);
          }, 100);
        } else {
          setCpLoading(false);

          setMunicipioInput("Ingresa el municipio destino");
        }
      } catch (e) {
        console.log(e);
        setCpLoading(false);
        setMunicipioInput("Ingresa el municipio destino");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-neutral-100 rounded-lg">
      <div className="flex flex-row gap-4 items-center">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <Input
              value={cpValue}
              className=" h-8"
              type="text"
              name="direccion"
              onChange={(e) => handleChange(e.target.value)}
              placeholder="cp"
              required
              disabled={disabled || cpLoading}
            />
            <div className="absolute right-2 top-1">
              {cpLoading ? (
                <PulseLoader size={6} color="#acadac" />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <p className="h-4"></p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            value={municipioValue}
            className=" h-8"
            type="text"
            name="direccion"
            onChange={(e) => {
              setMunicipioInput("");
              updateMunicipioValue(e.target.value);
            }}
            placeholder="Municipio"
            required
            readOnly={cpFound}
            disabled={disabled || cpLoading}
          />
          {municipioInput ? (
            <p className="text-[11px] text-red-500">{municipioInput}</p>
          ) : (
            <p className="h-4"></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutocompleteWidget;
