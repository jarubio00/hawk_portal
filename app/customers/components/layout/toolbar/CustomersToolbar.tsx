"use client";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";

import CustomersDrawer from "../drawer/CustomersDrawer";
import ShoppingCartButtonSkeleton from "../skeleton/ShoppingCartButtonSkeleton";

interface CustomersToolbarProps {
  data?: string;
}

const CustomersToolbar: React.FC<CustomersToolbarProps> = ({ data }) => {
  const cartCount = 1;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="h-16 p-4 w-full flex flex-row items-center justify-between">
      {/*  <CustomersDrawer /> */}
      {/*  <img
        className="h-[36px] md:block cursor-pointer"
        src="/images/lmmx-light.png"
      /> */}
      <div></div>
      {isLoading ? (
        <ShoppingCartButtonSkeleton />
      ) : (
        <button
          className="relative w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-400 transition-colors"
          aria-label="Abrir carrito"
        >
          <ShoppingCart className="w-6 h-6 text-gray-800" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] text-[10px] bg-red-500 text-white rounded-full px-1.5 py-0.5 font-semibold">
              {cartCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default CustomersToolbar;
