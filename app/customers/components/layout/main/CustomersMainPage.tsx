"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Box,
  EllipsisVertical,
  HandCoins,
  LifeBuoy,
  MapPin,
  Navigation,
  Package,
  PackagePlus,
  Star,
  UserRound,
  Wallet,
} from "lucide-react";
import ActionButtonSkeleton from "../skeleton/ActionButtonSkeleton";
import DashboardCardSkeleton from "../skeleton/DashboardCardSkeleton";
import SettingCardSkeleton from "../skeleton/SettingCardSkeleton";
import ActionButton from "../ui/ActionButton";
import DashboardCard from "../ui/DashboardCard";
import SettingCard from "../ui/SettingCard";
import CreateShipmentButtonSkeleton from "../skeleton/CreateShipmentButtonSkeleton";

interface CustomersMainPageProps {
  data?: string;
}

const CustomersMainPage: React.FC<CustomersMainPageProps> = ({ data }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    getAuth();
  }, []);

  const getAuth = useCallback(async () => {
    const timer = setTimeout(() => setIsLoading(false), 2000); // simula carga
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4 p-4 w-screen min-h-screen">
      <div className="w-full">
        {isLoading ? (
          <CreateShipmentButtonSkeleton />
        ) : (
          <button
            className="w-full p-3 flex flex-row items-center justify-center hover:bg-blue-400 transition-colors rounded-md gap-2 bg-[linear-gradient(60deg,_rgb(247,_149,_51),_rgb(243,_112,_85),_rgb(239,_78,_123),_rgb(161,_102,_171),_rgb(80,_115,_184),_rgb(16,_152,_173),_rgb(7,_179,_155),_rgb(111,_186,_130))]"
            aria-label="Cerrar sidebar"
          >
            <PackagePlus className="h-5 w-5 text-white" />
            <p className="text-sm text-white">Crear envío</p>
          </button>
        )}
      </div>
      <div className=" bg-white px-0 py-2 space-y-4">
        {/* Cards */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {isLoading ? (
              <>
                <DashboardCardSkeleton />
                <DashboardCardSkeleton />
              </>
            ) : (
              <>
                <DashboardCard
                  icon={<Star className="w-6 h-6" />}
                  value="230 pts"
                  subtitle="Puntos acumulados"
                />
                <DashboardCard
                  icon={<Wallet className="w-6 h-6" />}
                  value="$1,500.00"
                  subtitle="Saldo disponible"
                />
              </>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white divide-y divide-gray-100">
        {isLoading ? (
          <>
            <SettingCardSkeleton />
            <SettingCardSkeleton />
            <SettingCardSkeleton />
          </>
        ) : (
          <>
            <SettingCard
              icon={<Wallet className="w-6 h-6" />}
              title="Billetera"
              subtitle="💰 Recarga tu saldo"
              href="/customers/wallet"
            />
            <SettingCard
              icon={<Package className="w-6 h-6" />}
              title="Envíos"
              subtitle="Activos"
              badge={4}
            />
            <SettingCard
              icon={<HandCoins className="w-6 h-6" />}
              title="Cobros a destinatario"
              subtitle="Activos"
              badge={1}
            />
          </>
        )}
      </div>

      <div className="bg-white  py-1 rounded-xl">
        <div className="grid grid-cols-3 gap-2 text-center">
          {isLoading ? (
            <>
              <ActionButtonSkeleton />
              <ActionButtonSkeleton />
              <ActionButtonSkeleton />
            </>
          ) : (
            <>
              <ActionButton
                icon={<MapPin className="w-5 h-5" />}
                label="Direcciones"
                href="/direcciones"
              />
              <ActionButton
                icon={<Navigation className="w-5 h-5" />}
                label="Destinos"
              />
              <ActionButton
                icon={<Box className="w-5 h-5" />}
                label="Paquetes"
              />
            </>
          )}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {isLoading ? (
            <>
              <ActionButtonSkeleton />
              <ActionButtonSkeleton />
              <ActionButtonSkeleton />
            </>
          ) : (
            <>
              <ActionButton
                icon={<LifeBuoy className="w-5 h-5" />}
                label="Tickets"
                badge={1}
              />
              <ActionButton
                icon={<UserRound className="w-5 h-5" />}
                label="Mi cuenta"
              />
              <ActionButton
                icon={<EllipsisVertical className="w-5 h-5" />}
                label="Más"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersMainPage;
