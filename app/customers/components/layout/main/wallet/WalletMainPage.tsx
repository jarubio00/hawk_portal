"use client";
import {
  ArrowLeft,
  Wallet,
  PlusCircle,
  FileText,
  History,
  ListOrdered,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ActionButton from "../../ui/ActionButton";
import { DashboardCard } from "../../ui/DashboardCard";
import SettingCard from "../../ui/SettingCard";

interface WalletMainPageProps {
  balance: string;
}

const WalletMainPage: React.FC<WalletMainPageProps> = ({ balance }) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 p-4 w-full">
      <button
        onClick={() => router.back()}
        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition"
        aria-label="Regresar"
      >
        <ArrowLeft className="w-5 h-5 text-black" />
      </button>
      {/* Card del saldo */}
      <div className="bg-white px-0 py-2">
        <DashboardCard
          icon={<Wallet className="w-6 h-6" />}
          value={balance}
          subtitle="Saldo disponible"
        />
      </div>

      {/* Botón principal de acción */}
      <div className="bg-white py-1 rounded-xl">
        <ActionButton
          icon={<PlusCircle className="w-5 h-5 text-black" />}
          label="Recargar saldo"
          onClick={() => router.push("/customers/wallet/recharge")}
        />
      </div>

      {/* Otras opciones */}
      <div className="bg-white divide-y divide-gray-100 rounded-xl">
        <SettingCard
          icon={<ListOrdered className="w-6 h-6" />}
          title="Movimientos"
          subtitle="Ver detalle de transacciones"
        />
        <SettingCard
          icon={<FileText className="w-6 h-6" />}
          title="Estado de cuenta"
          subtitle="Resumen mensual y PDF"
        />
        <SettingCard
          icon={<History className="w-6 h-6" />}
          title="Historial"
          subtitle="Registro completo"
        />
      </div>
    </div>
  );
};

export default WalletMainPage;
