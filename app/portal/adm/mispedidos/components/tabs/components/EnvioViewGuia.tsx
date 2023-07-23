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
    Image,
    BlobProvider,
    Svg,
    G,
    Polygon,
    PDFDownloadLink,
    Font
  } from "@react-pdf/renderer";

  import {guiaDoc} from "./pdf/pdfDocument";
  import axios from "axios";

import {createZpl} from '@/app/components/utils/zplUtils';

interface EnvioViewGuiaProps {
 data?: SafePedido;
}

const EnvioViewGuia: React.FC<EnvioViewGuiaProps> = ({
 data
}) => {

    useEffect(() => {
        zplToImage()
    },[])

    const [image,setImage] = useState();

   const zpl = createZpl(data);
    
   

   const zplToImage = async () => {
    let formData = new FormData();
    formData.append('file',zpl);

    const axiosConfig = {
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Accept": 'application/pdf',
            "Content-Type": 'application/x-www-form-urlencoded'
        },
        data: formData
    }

    const result = await axios.post(`http://api.labelary.com/v1/printers/8dpmm/labels/4x3/0/`, axiosConfig)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.message
    })
    setImage(result);
   }

    const GuiaDocument = () => (
        guiaDoc
        );

    
 return (
  <div className='m-4'>
    hola
    <img src={image} />
     {/* <PDFViewer style={{width: '100%', height: '95vh'}} showToolbar={false}>
        <GuiaDocument />
    </PDFViewer> */}
  </div>
 );
}

export default EnvioViewGuia;