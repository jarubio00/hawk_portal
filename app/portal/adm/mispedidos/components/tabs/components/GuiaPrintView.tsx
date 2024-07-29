"use client";
import { SafePedido } from "@/app/types";
import { MdDownload, MdPrint, MdShare } from "react-icons/md";
import GuiaLabelView from "./GuiaLabelView";
import GuiaPrint from "./GuiaPrint";
import React, { useState, useRef, useEffect } from "react";
import ReactToPrint from "react-to-print";

interface GuiaPrintViewProps {
  data?: SafePedido;
}

const GuiaPrintView: React.FC<GuiaPrintViewProps> = ({ data }) => {
  const componentRef = useRef();
  return (
    <div className="flex flex-col gap-2 my-2 mx-2">
      <div className="flex flex-row gap-4 mb-0">
        {/* <ReactToPrint
          trigger={() => (
            <div className="p-2 bg-neutral-200 rounded-full cursor-pointer">
              <MdPrint className="text-neutral-100" size={25} />
            </div>
          )}
          //@ts-ignore
          content={() => componentRef.current}
        /> */}
        <GuiaPrint data={data} />
        <div className="p-2 bg-neutral-200 rounded-full cursor-pointer">
          <a
            target="_blank"
            href={"http://www.file.com/file.pdf"}
            rel="noopener noreferrer"
          >
            <MdDownload className="text-neutral-500" size={25} />
          </a>
        </div>
        <div className="p-2 bg-neutral-200 rounded-full">
          <MdShare className="text-neutral-500" size={25} />
        </div>
      </div>
      <hr className="mt-2 mb-4"></hr>
      <GuiaLabelView data={data} />

      {/* <div className="hidden" ref={componentRef}>
        <GuiaLabelView data={data} />
      </div> */}
    </div>
  );
};

export default GuiaPrintView;
