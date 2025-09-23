import React from "react";
import { useRouter } from "next/navigation";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  badge?: number;
  href?: string;
}

export function ActionButton({
  icon,
  label,
  onClick,
  disabled = false,
  badge,
  href,
}: ActionButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (disabled) return;
    if (onClick) onClick();
    else if (href) router.push(href);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`relative flex flex-col items-center justify-center gap-2 py-2 px-2 border border-gray-100 rounded-md w-full text-center transition hover:scale-105 active:scale-95 duration-150 ${
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
      }`}
    >
      {/* Badge */}
      {badge !== undefined && badge > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold shadow-md">
          {badge > 99 ? "99+" : badge}
        </span>
      )}

      {/* Icon */}
      <div className="w-5 h-5 text-black">{icon}</div>

      {/* Label */}
      <span className="text-xs text-gray-700 font-medium">{label}</span>
    </button>
  );
}

export default ActionButton;
