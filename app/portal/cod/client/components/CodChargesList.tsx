"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Cod2Charge, Cod2ChargeStatus } from "../types";
import {
  Search,
  Filter,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  ChevronRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface CodChargesListProps {
  charges: Cod2Charge[];
  onChargeClick: (charge: Cod2Charge) => void;
}

export function CodChargesList({
  charges,
  onChargeClick,
}: CodChargesListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "IN_PROCESS" | "CONFIRMED" | "CANCELLED"
  >("IN_PROCESS");

  function currencyFormat(num: number) {
    return Number(num / 100)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function getCategoryLabel(
    category: "IN_PROCESS" | "CONFIRMED" | "CANCELLED"
  ): string {
    const labels = {
      IN_PROCESS: "en proceso",
      CONFIRMED: "confirmados",
      CANCELLED: "cancelados",
    };
    return labels[category];
  }

  // Filtrar cobros por categoría
  const getChargesByCategory = (
    category: "IN_PROCESS" | "CONFIRMED" | "CANCELLED"
  ) => {
    switch (category) {
      case "IN_PROCESS":
        return charges.filter(
          (c) =>
            c.status === Cod2ChargeStatus.INITIATED ||
            c.status === Cod2ChargeStatus.IN_ROUTE ||
            c.status === Cod2ChargeStatus.ATTEMPTED ||
            c.status === Cod2ChargeStatus.COLLECTED ||
            c.status === Cod2ChargeStatus.PARTIALLY_COLLECTED
        );
      case "CONFIRMED":
        return charges.filter((c) => c.status === Cod2ChargeStatus.HANDED_IN);
      case "CANCELLED":
        return charges.filter(
          (c) =>
            c.status === Cod2ChargeStatus.CANCELLED ||
            c.status === Cod2ChargeStatus.UNCOLLECTIBLE
        );
      default:
        return charges;
    }
  };

  // Obtener cobros filtrados por categoría
  const categoryCharges = getChargesByCategory(statusFilter);

  // Filtrar por búsqueda
  const filteredCharges = categoryCharges.filter((charge) =>
    charge.pedidoId.toString().includes(searchQuery)
  );

  // Mostrar buscador solo si hay más de 10 cobros en la categoría actual
  const showSearch = categoryCharges.length > 10;

  function getStatusBadge(status: Cod2ChargeStatus) {
    const styles: Record<
      Cod2ChargeStatus,
      { className: string; label: string }
    > = {
      [Cod2ChargeStatus.INITIATED]: {
        className: "bg-blue-50 text-blue-700 border-blue-200",
        label: "Programado",
      },
      [Cod2ChargeStatus.IN_ROUTE]: {
        className: "bg-purple-50 text-purple-700 border-purple-200",
        label: "En Ruta",
      },
      [Cod2ChargeStatus.ATTEMPTED]: {
        className: "bg-orange-50 text-orange-700 border-orange-200",
        label: "Intentado",
      },
      [Cod2ChargeStatus.PARTIALLY_COLLECTED]: {
        className: "bg-neutral-200 text-black border-neutral-400",
        label: "Cobrado",
      },
      [Cod2ChargeStatus.COLLECTED]: {
        className: "bg-neutral-200 text-black border-neutral-400",
        label: "Cobrado",
      },
      [Cod2ChargeStatus.CANCELLED]: {
        className: "bg-red-50 text-red-700 border-red-200",
        label: "Cancelado",
      },
      [Cod2ChargeStatus.UNCOLLECTIBLE]: {
        className: "bg-red-50 text-red-700 border-red-200",
        label: "No Cobrable",
      },
      [Cod2ChargeStatus.HANDED_IN]: {
        className: "bg-green-50 text-green-700 border-indigo-200",
        label: "Confirmado",
      },
      [Cod2ChargeStatus.SETTLED_TO_CLIENT]: {
        className: "bg-green-50 text-green-700 border-gray-200",
        label: "Liquidado",
      },
    };

    const style = styles[status] || styles[Cod2ChargeStatus.INITIATED];
    return (
      <Badge variant="outline" className={`text-xs ${style.className}`}>
        {style.label}
      </Badge>
    );
  }

  function getStatusIcon(status: Cod2ChargeStatus) {
    const iconProps = { className: "h-4 w-4" };

    switch (status) {
      case Cod2ChargeStatus.INITIATED:
        return <Clock {...iconProps} className="text-black" />;
      case Cod2ChargeStatus.IN_ROUTE:
        return <Package {...iconProps} className="text-black" />;
      case Cod2ChargeStatus.COLLECTED:
        return <CheckCircle {...iconProps} className="text-black" />;
      case Cod2ChargeStatus.HANDED_IN:
        return <CheckCircle {...iconProps} className="text-green-600" />;
      case Cod2ChargeStatus.ATTEMPTED:
      case Cod2ChargeStatus.PARTIALLY_COLLECTED:
        return <AlertCircle {...iconProps} className="text-black" />;
      case Cod2ChargeStatus.CANCELLED:
      case Cod2ChargeStatus.UNCOLLECTIBLE:
        return <XCircle {...iconProps} className="text-red-500" />;
      default:
        return <Clock {...iconProps} className="text-black" />;
    }
  }

  return (
    <div className="space-y-3">
      {/* Filtros como badges */}
      <div className="my-4 py-2 flex flex-row items-center gap-4 overflow-x-auto overflow-y-hidden whitespace-nowrap scrollbar-hide">
        <Badge
          variant={statusFilter === "IN_PROCESS" ? "default" : "secondary"}
          className="cursor-pointer pr-2 pl-2 py-1 flex-shrink-0"
          onClick={() => {
            setStatusFilter("IN_PROCESS");
            setSearchQuery("");
          }}
        >
          <div className="flex flex-row items-center gap-1">
            <Clock className="h-3 w-3" />
            <p className="text-[11px]">En proceso</p>
            <p className="text-[11px]">
              ({getChargesByCategory("IN_PROCESS").length})
            </p>
          </div>
        </Badge>
        <Badge
          variant={statusFilter === "CONFIRMED" ? "default" : "secondary"}
          className="cursor-pointer pr-2 pl-2 py-1 flex-shrink-0"
          onClick={() => {
            setStatusFilter("CONFIRMED");
            setSearchQuery("");
          }}
        >
          <div className="flex flex-row items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            <p className="text-[11px]">Confirmados</p>
            <p className="text-[11px]">
              ({getChargesByCategory("CONFIRMED").length})
            </p>
          </div>
        </Badge>
        <Badge
          variant={statusFilter === "CANCELLED" ? "default" : "secondary"}
          className="cursor-pointer pr-2 pl-2 py-1 flex-shrink-0"
          onClick={() => {
            setStatusFilter("CANCELLED");
            setSearchQuery("");
          }}
        >
          <div className="flex flex-row items-center gap-1">
            <XCircle className="h-3 w-3" />
            <p className="text-[11px]">Cancelados</p>
            <p className="text-[11px]">
              ({getChargesByCategory("CANCELLED").length})
            </p>
          </div>
        </Badge>
      </div>

      {/* Buscador - solo si hay más de 10 cobros */}
      {showSearch && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar por ID de envío..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      )}

      {/* Lista de cobros */}
      <div className="space-y-2">
        {filteredCharges.length > 0 ? (
          filteredCharges.map((charge) => (
            <Card
              key={charge.id}
              className="p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all cursor-pointer"
              onClick={() => onChargeClick(charge)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center">
                    {getStatusIcon(charge.status)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-semibold text-gray-900">
                        Envío #{charge.pedidoId}
                      </p>
                      {getStatusBadge(charge.status)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>
                        Solicitado: ${currencyFormat(charge.amountRequested)}
                      </span>
                      {charge.amountCollected > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-green-600 font-medium">
                            Cobrado: ${currencyFormat(charge.amountCollected)}
                          </span>
                        </>
                      )}
                      {charge.attempts && charge.attempts.length > 0 && (
                        <>
                          <span>•</span>
                          <span>
                            {charge.attempts.length}{" "}
                            {charge.attempts.length === 1
                              ? "intento"
                              : "intentos"}
                          </span>
                        </>
                      )}
                      {charge.issues && charge.issues.length > 0 && (
                        <>
                          <span>•</span>
                          <span className="text-red-600 font-medium">
                            {charge.issues.length}{" "}
                            {charge.issues.length === 1
                              ? "incidencia"
                              : "incidencias"}
                          </span>
                        </>
                      )}
                    </div>
                    {(charge.status === Cod2ChargeStatus.COLLECTED ||
                      charge.status ===
                        Cod2ChargeStatus.PARTIALLY_COLLECTED) && (
                      <div className="mt-2 text-xs text-amber-600 font-medium">
                        Cobro en proceso de confirmación, puede tomar hasta
                        24hrs.
                      </div>
                    )}
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-8 border border-gray-200">
            <div className="text-center text-gray-500">
              <Package className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">
                {searchQuery
                  ? `No se encontraron cobros ${getCategoryLabel(
                      statusFilter
                    )} con el ID "${searchQuery}"`
                  : `No se encontraron cobros ${getCategoryLabel(
                      statusFilter
                    )}`}
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
