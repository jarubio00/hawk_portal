'use client';

import {useEffect, useState} from 'react';
import { SafePedido } from "@/app/types";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    BlobProvider,
    Svg,
    G,
    Polygon,
    PDFDownloadLink,
    Font
  } from "@react-pdf/renderer";

  import {guiaDoc} from "./pdf/pdfDocument";
  import axios from "axios";
  import Image from 'next/image';
  import {MdPrint, MdDownload, MdShare} from 'react-icons/md';
import GuiaPrint from './GuiaPrint';
import Link from 'next/link';


interface EnvioViewGuiaProps {
 data?: SafePedido;
}

const EnvioViewGuia: React.FC<EnvioViewGuiaProps> = ({
 data
}) => {

    useEffect(() => {
     
    },[])

    const [image,setImage] = useState();
    const pdfFile = data?.labelPdfUrl ? data?.labelPdfUrl : 'https://pdffiles.com/file.pdf';

    const GuiaDocument = () => (
        guiaDoc(data)
        );

    const handlePrint = (event: any) => {
      event.preventDefault();
      if (pdfFile) {
        window.open(pdfFile, "PRINT", "height=400,width=600");
      }
     
    };


       /*  <PDFViewer style={{width: '100%', height: '95vh'}} showToolbar={false}>
        <GuiaDocument />
    </PDFViewer> */
    
 return (
  <div className='m-4'>
    <div className='flex flex-col gap-1'>
      <div className='flex flex-row gap-4 mb-0'>
          <GuiaPrint url={pdfFile} />
          <div className='p-2 bg-neutral-200 rounded-full cursor-pointer'>
            <a target="_blank" href={pdfFile} rel="noopener noreferrer">
              <MdDownload className='text-neutral-500' size={25}/>
             </a>
          </div>
          <div className='p-2 bg-neutral-200 rounded-full'>
             <MdShare className='text-neutral-500' size={25}/>
          </div>
      </div>
      <hr className='mt-2 mb-4'></hr>
        <div className='hidden md:block'>
          {data?.labelImageUrl && <Image src={data?.labelImageUrl}
                  alt="Banner 1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '50%', height: 'auto' }}
              />}
        </div>
        <div className='block md:hidden'>
          {data?.labelImageUrl && <Image src={data?.labelImageUrl}
                  alt="Banner 1"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: '85%', height: 'auto' }}
              />}
        </div>
    </div>

    
  </div>
 );
}

export default EnvioViewGuia;