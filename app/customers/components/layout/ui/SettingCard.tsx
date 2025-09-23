import { ChevronRight } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

interface SettingCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  badge?: number;
  onClick?: () => void;
  disabled?: boolean;
  href?: string;
}

export function SettingCard({
  icon,
  title,
  subtitle,
  badge,
  onClick,
  disabled = false,
  href,
}: SettingCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    else if (href) router.push(href);
  };

  const iconClass = disabled ? "text-gray-400" : "text-black";
  const titleClass = disabled ? "text-gray-500" : "text-black";
  const subtitleClass = disabled ? "text-gray-400" : "text-gray-500";
  const arrowClass = disabled ? "text-gray-300" : "text-gray-400";

  const displayBadge = badge !== undefined && badge > 0;
  const badgeText = badge && badge > 99 ? "99+" : badge;

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-between py-3 px-2 min-h-[78px] w-full text-left transition rounded-md hover:scale-105 active:scale-95 duration-150 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
      }`}
    >
      {/* Icono + texto */}
      <div className="flex items-center gap-4">
        <div className={iconClass}>{icon}</div>

        <div className="flex flex-col text-left space-y-0.5">
          <h2 className={`text-sm font-medium ${titleClass}`}>{title}</h2>
          <div className="flex items-center gap-2">
            {displayBadge && (
              <span className="min-w-[20px] text-center text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold">
                {badgeText}
              </span>
            )}
            <p className={`text-xs ${subtitleClass}`}>{subtitle}</p>
          </div>
        </div>
      </div>

      {/* Flecha */}
      <ChevronRight className={`w-5 h-5 ${arrowClass}`} />
    </button>
  );
}

export default SettingCard;
