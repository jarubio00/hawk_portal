import React from "react";

interface DashboardCardProps {
  icon: React.ReactNode;
  value: string;
  subtitle: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function DashboardCard({
  icon,
  value,
  subtitle,
  onClick,
  disabled = false,
}: DashboardCardProps) {
  const iconClass = disabled ? "text-gray-400" : "text-black";
  const valueClass = disabled ? "text-gray-500" : "text-black";
  const subtitleClass = disabled ? "text-gray-400" : "text-gray-500";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-32 p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between w-full text-left transition ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
      }`}
    >
      {/* Ícono */}
      <div className={`w-7 h-7 ${iconClass}`}>{icon}</div>

      {/* Valor + descripción */}
      <div className="flex flex-col space-y-0.5">
        <h2 className={`text-sm font-semibold leading-tight ${valueClass}`}>
          {value}
        </h2>
        <p className={`text-[11px] leading-snug ${subtitleClass}`}>
          {subtitle}
        </p>
      </div>
    </button>
  );
}

export default DashboardCard;
