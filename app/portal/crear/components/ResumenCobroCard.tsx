"use client";

import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { IPedido } from "@/app/types/pedido";
import { AiFillDollarCircle } from "react-icons/ai";
import { Card } from "@/components/ui/card";

interface ResumenCobroCardProps {
  data: IPedido;
}

const ResumenCobroCard: React.FC<ResumenCobroCardProps> = ({ data }) => {
  // Función para formatear moneda con separador de miles
  function currencyFormat(num: number) {
    return Number(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  if (!data.cobro || !data.cobroCantidad) {
    return null;
  }

  return (
    <div className="mt-3">
      <Card className="w-full lg:w-2/4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="flex flex-row items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <AiFillDollarCircle size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs text-gray-600 font-medium">
              Cobro a destinatario
            </p>
            <p className="text-lg font-bold text-green-700">
              ${currencyFormat(parseFloat(data.cobroCantidad as any))}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResumenCobroCard;
