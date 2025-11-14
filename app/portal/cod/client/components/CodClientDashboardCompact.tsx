"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DashboardStats, Cod2Charge } from "../types";
import { Calendar, ListTodo, Clock, ShieldCheck } from "lucide-react";
import { CodChargesList } from "./CodChargesList";
import { CodChargeDetail } from "./CodChargeDetail";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface CodClientDashboardCompactProps {
  clienteId: number;
}

export function CodClientDashboardCompact({
  clienteId,
}: CodClientDashboardCompactProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [charges, setCharges] = useState<Cod2Charge[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCharge, setSelectedCharge] = useState<Cod2Charge | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const loadDashboardData = async () => {
    console.log('[COD_DASHBOARD] Iniciando carga con clienteId:', clienteId);
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cod/dashboard?clienteId=${clienteId}`);
      console.log('[COD_DASHBOARD] Response status:', response.status);
      const data = await response.json();
      console.log('[COD_DASHBOARD] Data recibida:', data);
      setStats(data.stats);
      setCharges(data.charges);
    } catch (error) {
      console.error("[COD_DASHBOARD] Error loading dashboard data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('[COD_DASHBOARD] Componente montado con clienteId:', clienteId);
    if (clienteId) {
      loadDashboardData();
    } else {
      console.warn('[COD_DASHBOARD] clienteId es undefined o null');
      setIsLoading(false);
    }
  }, [clienteId]);

  function currencyFormat(num: number) {
    return Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="grid grid-cols-2 gap-3">
          <div className="h-24 bg-gray-200 rounded-lg"></div>
          <div className="h-24 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  // Datos para la gráfica pie - filtrar valores en 0
  const pieData = [
    { name: "Confirmados", value: stats?.pieChart.confirmed || 0, color: "#22c55e" },
    { name: "Cobrados", value: stats?.pieChart.inReview || 0, color: "#f59e0b" },
    { name: "Pendientes", value: stats?.pieChart.pending || 0, color: "#3b82f6" },
    { name: "Cancelados", value: stats?.pieChart.cancelled || 0, color: "#ef4444" },
  ].filter(item => item.value > 0);

  return (
    <div className="space-y-4">
      {/* Layout Principal: Grid 2x2 + Gráfica */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Columna 1: Grid 2x2 de Tarjetas */}
        <div className="grid grid-cols-2 gap-3">
          {/* Tarjeta 1: Periodo Actual */}
          <Card className="p-3 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 font-medium">Periodo Actual</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats?.currentPeriod.totalChargesCount || 0}
                </p>
                <p className="text-xs text-gray-500">
                  {stats?.currentPeriod.daysRemaining || 0} días restantes
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Calendar className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </Card>

          {/* Tarjeta 2: En Resguardo */}
          <Card className="p-3 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 font-medium">En Resguardo</p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {stats?.currentPeriod.totalHandedIn
                    ? currencyFormat(stats.currentPeriod.totalHandedIn)
                    : "0.00"}
                </p>
                <p className="text-xs text-gray-500">
                  {stats?.currentPeriod.handedInCount || 0} cobros confirmados
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </Card>

          {/* Tarjeta 3: Cobrados */}
          <Card className="p-3 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 font-medium">Cobrados</p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {stats?.currentPeriod.totalInReview
                    ? currencyFormat(stats.currentPeriod.totalInReview)
                    : "0.00"}
                </p>
                <p className="text-xs text-gray-500">
                  {stats?.currentPeriod.inReviewCount || 0} cobros por confirmar
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Clock className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </Card>

          {/* Tarjeta 4: Por Cobrar */}
          <Card className="p-3 border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <p className="text-xs text-gray-500 font-medium">Por Cobrar</p>
                <p className="text-2xl font-bold text-gray-900">
                  $
                  {stats?.currentPeriod.totalPending
                    ? currencyFormat(stats.currentPeriod.totalPending)
                    : "0.00"}
                </p>
                <p className="text-xs text-gray-500">
                  {stats?.currentPeriod.pendingCount || 0} cobros pendientes
                </p>
              </div>
              <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <ListTodo className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </Card>
        </div>

        {/* Columna 2: Gráfica Pie */}
        <Card className="p-4 border border-gray-200">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={{ stroke: "#000000", strokeWidth: 1 }}
                label={(props) => {
                  const { name, x, y } = props;
                  // Agregar offset horizontal para separar del conector
                  const offset = x > props.cx ? 5 : -5;
                  return (
                    <text
                      x={x + offset}
                      y={y}
                      fill="#000000"
                      fontSize="12px"
                      textAnchor={x > props.cx ? "start" : "end"}
                      dominantBaseline="central"
                    >
                      {name}
                    </text>
                  );
                }}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tabs de Cobros */}
      <Tabs defaultValue="periodo" className="w-full">
        <TabsList className="w-full justify-start rounded-none border-0 bg-transparent p-0 h-auto gap-1">
          <TabsTrigger
            value="periodo"
            className="rounded-md border-0 bg-transparent data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-4 py-2 text-sm font-bold"
          >
            Periodo
          </TabsTrigger>
          <TabsTrigger
            value="cortes"
            className="rounded-md border-0 bg-transparent data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-4 py-2 text-sm font-bold"
          >
            Cortes
          </TabsTrigger>
          <TabsTrigger
            value="retornos"
            className="rounded-md border-0 bg-transparent data-[state=active]:bg-gray-100 data-[state=active]:shadow-none px-4 py-2 text-sm font-bold"
          >
            Retornos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="periodo" className="mt-4">
          <CodChargesList
            charges={charges}
            onChargeClick={(charge) => {
              setSelectedCharge(charge);
              setIsDetailOpen(true);
            }}
          />
        </TabsContent>

        <TabsContent value="cortes" className="mt-4">
          <div className="text-sm text-gray-500">Contenido de Cortes</div>
        </TabsContent>

        <TabsContent value="retornos" className="mt-4">
          <div className="text-sm text-gray-500">Contenido de Retornos</div>
        </TabsContent>
      </Tabs>

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
