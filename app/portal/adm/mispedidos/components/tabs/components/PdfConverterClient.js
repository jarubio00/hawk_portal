'use client';
import React, { useState, useRef, useEffect } from "react";
import LoaderSingle from "@/app/components/LoaderSingle";

import * as pdfjsLib from "pdfjs-dist/build/pdf";
import { BsWindowSidebar } from "react-icons/bs";
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const HTTP_SUCCESS = 200;

export default function Converter({url}) {
    const [img, setImg] = useState();
    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [pages, setPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfFile, setPdfFile] = useState(null);
    const pageRenderRef = useRef();
    const [isLoading,setIsLoading] = useState(false);
  
    useEffect(() => {
      if (pdfFile && currentPage) {
        pageRender();
      }
    }, [pdfFile, currentPage]);

    useEffect(() => {
      console.log(window.devicePixelRatio);
      setIsLoading(true);
      onConvert();
    },[])
  
    const onConvert = async () => {
      //const uri = URL.createObjectURL(selectedFile);
      const comprobanteUrl = url;
      const pdf = await pdfjsLib.getDocument({ url: comprobanteUrl });
  
      await pdf.promise.then(
        (_pdf) => {
          const {
            _pdfInfo: { numPages },
          } = _pdf;
          setPages(numPages);
          setPdfFile(_pdf);
          setIsLoading(false);
        },
        (error) => {
          console.log("PDF error :", error);
        }
      );
    };
  
    const pageRender = () => {
      pdfFile.getPage(currentPage).then(async (page) => {
        const viewport = page.getViewport({ scale: .8 });
        const canvas = pageRenderRef.current;
        const context = pageRenderRef.current.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          enableWebGL: false,
        };
        let renderTask = page.render(renderContext);
        await renderTask.promise.then((complete) => {
          console.log(complete);
          setImg(canvas.toDataURL());
        });
       
      });
    };
  
    
    return (
      <div className="container">
        <div className="row">
          <div className="column">
            <>
              <p>{window.devicePixelRatio}</p>
              {isLoading && <LoaderSingle />}
              {pdfFile && !isLoading && (
                <>
                  <canvas ref={pageRenderRef} width="100" height="200"></canvas>
                </>
              )}
            </>
  
          </div>
        </div>
      </div>
    );
  }