"use client";
import { Star, Wallet } from "lucide-react";
import DashboardCard from "../../ui/DashboardCard";

interface SectionDashboardProps {
  data?: string;
}

const SectionDashboard: React.FC<SectionDashboardProps> = ({ data }) => {
  return (
    <div className=" bg-white px-0 py-2 space-y-4">
      {/* Cards */}
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default SectionDashboard;
