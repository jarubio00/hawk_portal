"use client";

import React from "react";

const BackgroundLluvia: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const bgColor = "#6ad0f5";
  const bgUrl = "https://hawkportal.lamensajeria.mx/images/avisos/rain1.gif";
  const bgUrlClass = "bg-[url('" + bgUrl + "')]";
  return (
    <div
      className=" w-full h-screen overflow-hidden text-black"
      style={{
        background: `radial-gradient(
            circle at center,
            ${bgColor} 20%,
            rgba(224, 242, 255, 0.7) 60%,
            rgba(224, 242, 255, 0.3) 80%,
            transparent 100%
          )`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "absolute",
        backgroundSize: "cover",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <div className={`h-full`} style={{ background: `url('${bgUrl}')` }}>
        <div className="flex items-center justify-center h-full p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundLluvia;
//url('/images/avisos/rain1.gif')
