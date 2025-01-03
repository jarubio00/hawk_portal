"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface MontoSeguroInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onValueChange?: (value: number) => void;
}

export function MontoSeguroInput({
  onValueChange,
  ...props
}: MontoSeguroInputProps) {
  const {
    shipmentValue,
    updateShipmentValue,
    seguroSelected,
    updateSeguroSelected,
  } = useNacionalCrearStore();

  const [value, setValue] = useState(shipmentValue);

  const formatPeso = (val: string): string => {
    // Remover cualquier caracter que no sea número o punto
    const numericValue = val.replace(/[^0-9.]/g, "");

    // Dividir en parte entera y decimal
    const [intPart, decPart] = numericValue.split(".");

    // Formatear la parte entera con comas para los miles
    const formattedIntPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    // Reconstruir el número con hasta dos decimales
    let formattedValue = formattedIntPart;
    if (decPart !== undefined) {
      formattedValue += "." + decPart.slice(0, 2);
    }

    // Agregar el símbolo de peso mexicano
    return `MX$ ${formattedValue}`;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9.]/g, "");

    if (/^\d*\.?\d{0,2}$/.test(numericValue) || numericValue === "") {
      const formattedValue = formatPeso(numericValue);
      setValue(formattedValue);
      onValueChange && onValueChange(parseFloat(numericValue) || 0);
      updateShipmentValue(numericValue);
    }
  };

  useEffect(() => {
    // Formatear el valor inicial si existe
    if (props.value) {
      setValue(formatPeso(props.value.toString()));
    }
  }, [props.value]);

  return (
    <div className="relative w-[200px]">
      <Input
        {...props}
        type="text"
        value={value}
        onChange={handleChange}
        className="pl-2 pr-4"
        placeholder="MXN$ 0.00"
      />
    </div>
  );
}
