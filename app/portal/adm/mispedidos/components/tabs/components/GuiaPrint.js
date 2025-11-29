"use client";
import React, { useState, useRef, useEffect } from "react";
import LoaderSingle from "@/app/components/LoaderSingle";
import GuiaLabelView from "./GuiaLabelView";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "./PdfConverter.css";
import ReactToPrint from "react-to-print";
import { MdPrint, MdDownload, MdShare } from "react-icons/md";

export default function GuiaPrint({ data }) {
  const [isLoading, setIsLoading] = useState(true);
  const componentRef = useRef();

  function onDocumentLoadSuccess({ numPages }) {
    //console.log("object: pdf");
    setIsLoading(false);
  }

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <div className="p-2 bg-neutral-200 rounded-full cursor-pointer">
            <MdPrint className="text-rose-500" size={25} />
          </div>
        )}
        content={() => componentRef.current}
      />
      <div className="hidden">
        <div ref={componentRef} className="pt-4 pl-4">
          <GuiaLabelView data={data} />
        </div>
      </div>
    </div>
  );
}
