
'use client';

import { useContext, useEffect, useState } from "react";
import {PedidoContext} from "@/app/portal/crear/context/PedidoContext"
import {PedidoContextType} from "@/app/types/pedido"
import {GrCloudUpload} from "react-icons/gr";
import Image from 'next/image';
import { uploadFile } from "@/app/actions/apiQuerys";

interface ComprobanteInputProps {
  onChange: (props: any) => void;
}

//se quito w-full , se agregp px-2
const ComprobanteInput: React.FC<ComprobanteInputProps> = ({ 
    onChange, 
}) => {

const {updateActiveStep , saveMetodoPago, pedido} = useContext(PedidoContext) as PedidoContextType;

const pdfPlaceholder = '/images/pdf-placeholder.png';
const [errorMessage, setErrorMessage] = useState('');
const [image,setImage] = useState('');
const [imageName,setImageName] = useState('');
const [imageFile,setImageFile] = useState<File>();
const [fileType,setFileType] = useState('');
const [fileSelected,setFileSelected] = useState(false);
const [progressUpload, setProgressUpload] = useState(0)
const [downloadURL, setDownloadURL] = useState('')
const [isUploading, setIsUploading] = useState(false)


const handleInputFile = async (event: any) => {
    let file = null;
    let fileType = '';


    if (event.target.files[0].type.match(/^image\//) ) {
        file = event.target.files[0];
         setImageFile(event.target.files[0]);
        fileType = 'imagen';
      } else if (event.target.files[0].type.match(/\/pdf/) ) {
        file = event.target.files[0];
        setImageFile(event.target.files[0]);
        fileType = 'pdf';
    } else {
      setErrorMessage('Formato no soportado');
    }

    if (file) {
      const fileMb = file.size /1024 ** 2;

      if (fileMb >= 2) {
        setErrorMessage('El archivo excede el tamaño máximo (2Mb)');
        return
      } else {
        setErrorMessage('')
      }
    }

    if (fileType == 'imagen') {
      setFileType('imagen');
      setImage(URL.createObjectURL(file))
      setImageName(file.name);
      setFileSelected(true);
    } else if (fileType == 'pdf') {
      console.log('usando pdf')
      setFileType('pdf');
      setImage(pdfPlaceholder);
      setImageName(file.name);
      setFileSelected(true);
    }
    

    event.target.value = null;

    saveMetodoPago({
      ...pedido?.metodoPago,
      formaPagoId: 2,
      passed: true,
      comprobante: true,
      comprobanteUrl: 'http://pagina.com/comprobante.jpg',
      comprobanteFileType:  fileType,
      comprobanteString: ''
      })
}



const handleQuitarFile = () => {
  setFileSelected(false);
  setImage('');
  setErrorMessage('');
}

const handleUploadFile = async () => {
  

  if (imageFile) {
   
   const base64 = await toBase64(imageFile);
   console.log(base64);

   let formData = new FormData();
   formData.append('file',imageFile);
   formData.append('fileName',imageName);
   formData.append('pedido','768909');

    const up = await uploadFile(formData);
   
    }
  }

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return ( 
    <div className="">
        <p className="my-1 text-xs text-neutral-500">Carga tu comprobante de pago</p>
        {!fileSelected && <label htmlFor="file">
            <input id="file" type='file' accept="image/*, application/pdf" name='file' className="hidden" onChange={handleInputFile}></input>
             <div className="cursor-pointer w-32 p-2 text-sm  flex flex-row items-center gap-1 ">
                <GrCloudUpload  size={18} />
                <p>Seleccionar</p>
             </div>
             <p className="text-xs text-red-600 m-2">{errorMessage}</p>
        </label>}
        { fileSelected && image != '' && <div className="my-2 mx-3 flex flex-col">
                  <Image src={image} width={100} height={150} alt='Comprobante'/>
                  <p className="text-xs text-blue-500">{imageName}</p>
                  <div className="flex flex-row gap-2 mt-2">
                      <div>
                        <label htmlFor="file">
                          <input id="file" type='file' accept="image/*, application/pdf" name='file' className="hidden" onChange={handleInputFile}></input>
                            <p className="text-neutral-500 text-xs cursor-pointer">Cambiar</p>
                        </label>
                      </div>
                      <div onClick={handleQuitarFile}><p className="text-red-500 text-xs cursor-pointer">Quitar</p></div>
                  </div>
                  <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
             </div>}

            <button onClick={handleUploadFile}>Cargar archivo</button>
             Progress: {progressUpload}
      
    </div>
   );
}
 
export default ComprobanteInput;