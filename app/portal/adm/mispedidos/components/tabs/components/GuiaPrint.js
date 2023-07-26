'use client';
import React, { useState, useRef, useEffect } from "react";
import LoaderSingle from "@/app/components/LoaderSingle";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import "./PdfConverter.css"
import ReactToPrint from 'react-to-print';
import {MdPrint, MdDownload, MdShare} from 'react-icons/md';

export default function GuiaPrint({url}) {
    const [isLoading,setIsLoading] = useState(true);
    const componentRef = useRef();
  
    function onDocumentLoadSuccess({ numPages }) {
      console.log("object: pdf");
      setIsLoading(false);
    }
      
      return (
        <div>
           <ReactToPrint
              trigger={() => 
                <div className='p-2 bg-neutral-200 rounded-full cursor-pointer' >
                    <MdPrint className='text-neutral-100' size={25}/>
                </div>
              }
              content={() => componentRef.current}
            />
          <div className="hidden">
              <div ref={componentRef} className="Example__container__document2">
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
                    width={980}
                    height={1300}
                  />
                </Document>
              </div>
          </div>
        </div>
      );
}