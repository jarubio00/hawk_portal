"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { DashboardStats, Cod2Charge, Cod2Settlement } from "../types";
import {
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import { CodChargesList } from "./CodChargesList";
import { CodChargeDetail } from "./CodChargeDetail";

interface CodClientDashboardProps {
  clienteId: number;
}

export function CodClientDashboard({ clienteId }: CodClientDashboardProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [charges, setCharges] = useState<Cod2Charge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharge, setSelectedCharge] = useState<Cod2Charge | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [clienteId]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cod/dashboard?clienteId=${clienteId}`);
      const data = await response.json();
      console.log("[CodClientDashboard] Stats received:", data.stats);
      console.log("[CodClientDashboard] nextSettlement:", data.stats?.nextSettlement);
      setStats(data.stats);
      setCharges(data.charges);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  function currencyFormat(num: number) {
    return Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards - Período Actual */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Período Actual
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Total Solicitado */}
          <Card className="p-4 border border-gray-200 hover:border-blue-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Total Solicitado
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ${stats?.currentPeriod.totalRequested ? currencyFormat(stats.currentPeriod.totalRequested) : "0.00"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </Card>

          {/* Total Cobrado */}
          <Card className="p-4 border border-gray-200 hover:border-green-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Total Cobrado
                </p>
                <p className="text-xl font-bold text-gray-900">
                  ${stats?.currentPeriod.totalCollected ? currencyFormat(stats.currentPeriod.totalCollected) : "0.00"}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </Card>

          {/* Pendientes de Cobro */}
          <Card className="p-4 border border-gray-200 hover:border-amber-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Pendientes de Cobro
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {stats?.currentPeriod.pendingCharges || 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </Card>

          {/* Cobros Activos */}
          <Card className="p-4 border border-gray-200 hover:border-orange-300 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500 font-medium mb-1">
                  Cobros Activos
                </p>
                <p className="text-xl font-bold text-gray-900">
                  {stats?.currentPeriod.activeCharges || 0}
                </p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center">
                <Package className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Próximo Corte */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Próximo Corte</h2>
        <Card className="p-5 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Período de Corte
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {stats?.nextSettlement.periodStart && stats?.nextSettlement.dueDate
                    ? `${new Date(stats.nextSettlement.periodStart).toLocaleDateString("es-MX", { day: "numeric", month: "short" })} - ${new Date(stats.nextSettlement.dueDate).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}`
                    : "N/A"}
                </p>
                <p className="text-xs text-gray-500">
                  {stats?.nextSettlement.daysRemaining
                    ? `${stats.nextSettlement.daysRemaining} días restantes`
                    : ""}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">
                Total Bruto Estimado
              </p>
              <p className="text-base font-semibold text-gray-900">
                ${stats?.nextSettlement.grossTotal ? currencyFormat(stats.nextSettlement.grossTotal) : "0.00"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">
                Comisión Estimada
              </p>
              <p className="text-base font-semibold text-gray-900">
                ${stats?.nextSettlement.commissionTotal ? currencyFormat(stats.nextSettlement.commissionTotal) : "0.00"}
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">
                Cargos Estimados
              </p>
              <p className="text-base font-semibold text-gray-900">
                $0.00
              </p>
            </div>

            <div>
              <p className="text-xs text-gray-500 font-medium mb-1">
                Total Neto Estimado
              </p>
              <p className="text-lg font-bold text-gray-900">
                ${stats?.nextSettlement.netTotal ? currencyFormat(stats.nextSettlement.netTotal) : "0.00"}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Cobros por Estado e Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cobros por Estado */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Cobros por Estado
          </h2>
          <Card className="p-4 border border-gray-200">
            {stats?.chargesByStatus && stats.chargesByStatus.length > 0 ? (
              <div className="space-y-2">
                {stats.chargesByStatus.map((item) => (
                  <div
                    key={item.status}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <StatusIcon status={item.status} />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getStatusLabel(item.status)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.count} {item.count === 1 ? "cobro" : "cobros"}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${currencyFormat(item.amount)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">No hay cobros registrados</p>
              </div>
            )}
          </Card>
        </div>

        {/* Issues Abiertos */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Incidencias Abiertas
          </h2>
          <Card className="p-5 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-red-50 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    Total de Incidencias
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.openIssues.total || 0}
                  </p>
                </div>
              </div>
            </div>

            {stats?.openIssues.critical && stats.openIssues.critical > 0 ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <p className="text-sm font-medium text-red-900">
                    {stats.openIssues.critical}{" "}
                    {stats.openIssues.critical === 1
                      ? "incidencia crítica"
                      : "incidencias críticas"}
                  </p>
                </div>
                <p className="text-xs text-red-600 mt-1 ml-6">
                  Requieren atención inmediata
                </p>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium text-green-900">
                    Sin incidencias críticas
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Lista de Cobros */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          Todos los Cobros
        </h2>
        <CodChargesList
          charges={charges}
          onChargeClick={(charge) => {
            setSelectedCharge(charge);
            setIsDetailOpen(true);
          }}
        />
      </div>

      {/* Modal de Detalle */}
      <CodChargeDetail
        charge={selectedCharge}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedCharge(null);
        }}
      />
    </div>
  );
}

function StatusIcon({ status }: { status: string }) {
  const iconProps = { className: "h-4 w-4" };

  switch (status) {
    case "INITIATED":
      return (
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
          <Clock {...iconProps} className="text-blue-600" />
        </div>
      );
    case "IN_ROUTE":
      return (
        <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
          <Package {...iconProps} className="text-purple-600" />
        </div>
      );
    case "COLLECTED":
      return (
        <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
          <CheckCircle {...iconProps} className="text-green-600" />
        </div>
      );
    case "ATTEMPTED":
      return (
        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
          <AlertCircle {...iconProps} className="text-orange-600" />
        </div>
      );
    case "CANCELLED":
    case "UNCOLLECTIBLE":
      return (
        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
          <XCircle {...iconProps} className="text-red-600" />
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center">
          <Clock {...iconProps} className="text-gray-600" />
        </div>
      );
  }
}

function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    INITIATED: "Programado",
    IN_ROUTE: "En Ruta",
    ATTEMPTED: "Intentado",
    PARTIALLY_COLLECTED: "Cobrado Parcial",
    COLLECTED: "Cobrado",
    CANCELLED: "Cancelado",
    UNCOLLECTIBLE: "No Cobrable",
    HANDED_IN: "Entregado",
    SETTLED_TO_CLIENT: "Liquidado",
  };

  return labels[status] || status;
}
