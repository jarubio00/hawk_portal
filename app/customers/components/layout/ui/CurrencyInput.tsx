"use client";

import { useEffect, useRef, useState } from "react";

interface CurrencyInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function CurrencyInput({
  value,
  onChange,
  min = 0,
  max = 1000000,
  disabled = false,
}: CurrencyInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rawValue, setRawValue] = useState("");
  const [error, setError] = useState("");

  // Inicializar con valor
  useEffect(() => {
    if (value > 0) setRawValue(formatCurrency(value));
  }, [value]);

  function formatCurrency(num: number | string) {
    const number = typeof num === "number" ? num : parseFloat(num);
    if (isNaN(number)) return "";
    return number.toLocaleString("en-US");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/[^\d]/g, ""); // solo dígitos
    const numeric = parseFloat(raw);

    if (!raw) {
      setRawValue("");
      onChange(0);
      setError("");
      return;
    }

    if (numeric < min) {
      setError(`El mínimo es $${min.toLocaleString()}`);
    } else if (numeric > max) {
      setError(`El máximo es $${max.toLocaleString()}`);
    } else {
      setError("");
    }

    onChange(numeric);
    setRawValue(formatCurrency(raw));
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    const length = e.target.value.length;
    setTimeout(() => {
      e.target.setSelectionRange(length, length);
    }, 0);
  }

  return (
    <div className="w-full">
      <div
        className={`relative w-full rounded-md border ${
          error ? "border-red-500" : "border-gray-300"
        } bg-white focus-within:ring-2 focus-within:ring-blue-500`}
      >
        {/* Ícono $ fijo */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 text-lg font-medium">
          $
        </div>

        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          placeholder="0.00"
          value={rawValue}
          onChange={handleChange}
          onFocus={handleFocus}
          disabled={disabled}
          className="pl-7 pr-3 py-3 w-full text-lg font-medium text-gray-800 placeholder:text-gray-400 rounded-md focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
      </div>

      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
