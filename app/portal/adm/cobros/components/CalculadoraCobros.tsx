"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

function formatMXN(n: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(isNaN(n) ? 0 : n);
}

// Redondeo a centavos
const toCents = (v: number) => Math.round(v * 100) / 100;

export function CalculadoraCobros() {
  const [montoRaw, setMontoRaw] = useState<string>("");
  const [metodoCobro, setMetodoCobro] = useState<string>("Efectivo"); // sin cargos extra
  const [tipoRetorno, setTipoRetorno] = useState<string>("deposito_banco"); // default
  const [confirmado, setConfirmado] = useState<boolean>(false);

  const monto = useMemo<number>(() => {
    const clean = montoRaw.replace(/[^\d.]/g, "");
    const parsed = parseFloat(clean);
    return isNaN(parsed) ? 0 : parsed;
  }, [montoRaw]);

  // Cargos por tipo de retorno
  const cargoRetorno = useMemo<number>(() => {
    switch (tipoRetorno) {
      case "deposito_banco":
        return 68;
      case "deposito_tienda":
        return 68 + 12; // guía + comisión tienda
      case "recoger_oficinas":
        return 0;
      default:
        return 0;
    }
  }, [tipoRetorno]);

  // Comisión 4.5% del monto
  const comision = useMemo<number>(() => toCents(monto * 0.045), [monto]);

  // Neto a recibir
  const neto = useMemo<number>(() => {
    if (!confirmado) return 0;
    const calc = toCents(monto - comision - cargoRetorno);
    return calc > 0 ? calc : 0;
  }, [confirmado, monto, comision, cargoRetorno]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (monto <= 0) return;
    if (!metodoCobro) return;
    if (!tipoRetorno) return;
    setConfirmado(true);
  };

  const resetResultado = () => setConfirmado(false);

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="space-y-4" onSubmit={onSubmit} onChange={resetResultado}>
        {/* Monto a cobrar */}
        <div className="grid gap-2">
          <Label htmlFor="monto">Monto a cobrar (MXN)</Label>
          <Input
            id="monto"
            inputMode="decimal"
            placeholder="Ej. 1250.00"
            value={montoRaw}
            onChange={(e) => {
              const val = e.target.value;
              // permitir solo dígitos y un punto
              if (/^[\d]*\.?[\d]*$/.test(val) || val === "") {
                setMontoRaw(val);
              }
            }}
          />
        </div>

        {/* Método de cobro (sin cargos extra) */}
        <div className="grid gap-2">
          <Label>Método de cobro</Label>
          <Select value={metodoCobro} onValueChange={setMetodoCobro}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Efectivo">Efectivo</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Tipo de retorno */}
        <div className="grid gap-2">
          <Label>Tipo de retorno</Label>
          <Select value={tipoRetorno} onValueChange={setTipoRetorno}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deposito_banco">Depósito en banco</SelectItem>
              <SelectItem value="deposito_tienda">
                Depósito en tienda de conveniencia
              </SelectItem>
              <SelectItem value="recoger_oficinas">
                Recoger efectivo en oficinas
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Botón calcular */}
        <div className="pt-2 flex justify-center">
          <Button
            type="submit"
            className="w-full sm:w-auto text-white"
            style={{ backgroundColor: "#eb7711" }}
            onMouseEnter={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#d5670f")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLButtonElement).style.backgroundColor =
                "#eb7711")
            }
          >
            Calcular
          </Button>
        </div>

        {/* Resultado */}
        <div className="mt-2 border rounded-lg p-3">
          <p className="text-sm text-muted-foreground mb-2">
            Recibes este monto:
          </p>

          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Monto</span>
            <span className="text-sm font-medium">{formatMXN(monto)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">Comisión 4.5%</span>
            <span className="text-sm font-medium">− {formatMXN(comision)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span className="text-sm text-muted-foreground">
              Cargos retorno
            </span>
            <span className="text-sm font-medium">
              − {formatMXN(cargoRetorno)}
            </span>
          </div>

          <hr className="my-2" />

          <p className="text-xl font-semibold text-center">
            {confirmado ? formatMXN(neto) : "—"}
          </p>
        </div>
      </form>
    </div>
  );
}
