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
        data: formData
    }

    const result = await axios.post(`http://api.labelary.com/v1/printers/8dpmm/labels/4x6/0/`, zpl)
    .then((response) => {
      
   
      return response.data;
    })
    .catch((error) => {
      return error.message
    })


    //const imageBlob = await result.blob();
    var binaryData = []
    binaryData.push(result);
    const resultFile = new File(binaryData, 'image.png');
    const imageObjectURL = URL.createObjectURL(resultFile);
    setImage(result);
   }

    const GuiaDocument = () => (
        guiaDoc
        );

    
 return (
  <div className='m-4'>
    hola
    {image && <img src={image} />}
     {/* <PDFViewer style={{width: '100%', height: '95vh'}} showToolbar={false}>
        <GuiaDocument />
    </PDFViewer> */}
  </div>
 );
}

export default EnvioViewGuia;