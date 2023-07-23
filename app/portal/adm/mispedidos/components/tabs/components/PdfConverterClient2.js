'use client';
import React, { useState, useRef, useEffect } from "react";
import LoaderSingle from "@/app/components/LoaderSingle";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "./PdfConverter.css"


export default function Converter({url}) {
  const [isLoading,setIsLoading] = useState(true);


  function onDocumentLoadSuccess({ numPages }) {
    console.log("object: pdf");
    setIsLoading(false);

  }
    
    return (
      <div>
         {isLoading && <LoaderSingle />}
        <div className="Example__container__document">
          <Document
            options={{ workerSrc: "/pdf.worker.js" }}
            file={{url: url}}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => console.log("Inside Error", error)}
          >
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              customTextRenderer={false}
              width={440}
              height={550}
            />
          </Document>
        </div>
      </div>
    );
  }