"use client";

import { useContext, useEffect, useState } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import { GrCloudUpload } from "react-icons/gr";
import { MdCloudUpload } from "react-icons/md";
import Image from "next/image";
import { preUploadFile, uploadFile } from "@/app/actions/apiQuerys";
import axios from "axios";

interface ComprobanteInputProps {
  onChange: (props: any) => void;
}

type UploadFile = {
  file: File;
  fileName: string;
  pedidoId: number;
};

//se quito w-full , se agregp px-2
const ComprobanteInput: React.FC<ComprobanteInputProps> = ({ onChange }) => {
  const { updateActiveStep, saveMetodoPago, pedido } = useContext(
    PedidoContext
  ) as PedidoContextType;

  const pdfPlaceholder = "/images/pdf-placeholder.png";
  const [errorMessage, setErrorMessage] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState<File>();
  const [fileType, setFileType] = useState("");
  const [fileSelected, setFileSelected] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleInputFile = async (event: any) => {
    let file = null;
    let fileType = "";

    if (event.target.files[0].type.match(/^image\//)) {
      file = event.target.files[0];
      setImageFile(event.target.files[0]);
      fileType = "imagen";
    } else if (event.target.files[0].type.match(/\/pdf/)) {
      file = event.target.files[0];
      setImageFile(event.target.files[0]);
      fileType = "pdf";
    } else {
      setErrorMessage("Formato no soportado");
      saveMetodoPago({
        ...pedido?.metodoPago,
        comprobanteError: true,
        comprobanteErrorMessage: "Formato no soportado",
      });
    }

    if (file) {
      const fileMb = file.size / 1024 ** 10;

      if (fileMb >= 2) {
        setErrorMessage("El archivo excede el tamaño máximo (10Mb)");
        saveMetodoPago({
          ...pedido?.metodoPago,
          comprobanteError: true,
          comprobanteErrorMessage: "El archivo excede el tamaño máximo (10Mb)",
        });
        return;
      } else {
        setErrorMessage("");
        saveMetodoPago({
          ...pedido?.metodoPago,
          comprobanteError: false,
          comprobanteErrorMessage: "",
        });
      }
    }

    if (fileType == "imagen") {
      setFileType("imagen");
      setImage(URL.createObjectURL(file));
      setImageName(file.name);
      setFileSelected(true);
    } else if (fileType == "pdf") {
      console.log("usando pdf");
      setFileType("pdf");
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
      comprobanteUrl: "",
      comprobanteFileType: fileType,
      comprobanteSelected: true,
      comprobanteString:
        fileType == "imagen" ? URL.createObjectURL(file) : pdfPlaceholder,
      comprobanteImageFile: file,
    });

    const filetoUpload: UploadFile = {
      file: file,
      fileName: file.name,
      pedidoId: 88443322,
    };
    const upload = await handleuploadFile(filetoUpload);
  };

  const handleQuitarFile = () => {
    setFileSelected(false);
    saveMetodoPago({
      ...pedido?.metodoPago,
      comprobanteSelected: false,
      passed: false,
    });
    setImage("");
    setErrorMessage("");
    saveMetodoPago({
      ...pedido?.metodoPago,
      comprobanteError: false,
      comprobanteErrorMessage: "",
    });
  };

  const handleuploadFile = async (file: UploadFile) => {
    if (pedido?.metodoPago?.comprobanteImageFile) {
      let formData = new FormData();
      formData.append("file", file?.file);
      formData.append("fileName", file?.fileName);
      formData.append("pedido", `${file.pedidoId}`);

      //const up = await preUploadFile(formData);
      const up = await directUpload(formData);
      console.log(up);
    }
  };

  const directUpload = async (props: FormData) => {
    const result = await axios
      .post(`/api/preupload`, props, {
        onUploadProgress: (progressEvent) => {
          let percentCompleted = 0;
          if (progressEvent.loaded && progressEvent.total) {
            percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        },
      })
      .then((response) => {
        console.log(response);
        console.log("Termino preupload");
      })
      .catch((error) => {
        console.log("Error en preupload");
        console.log(error);
      });

    console.log(result);
  };

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUploadFileBAK = async () => {
    console.log("up file", pedido?.metodoPago?.comprobanteImageFile);

    if (pedido?.metodoPago?.comprobanteImageFile) {
      const base64 = await toBase64(pedido?.metodoPago?.comprobanteImageFile);
      //console.log(base64);

      let formData = new FormData();
      formData.append("file", pedido?.metodoPago?.comprobanteImageFile);
      formData.append("fileName", imageName);
      formData.append("pedido", "768909");

      const up = await uploadFile(formData);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="my-2 ">
        <p className="text-2xl text-rose-500 font-bold mb-1">BANREGIO</p>

        <p className="text-sm font-semibold">Eslo Regiomontana S.A. DE C.V.</p>
        <p className="text-sm text-neutral-400">CUENTA: 025-03606-001-1</p>
        <p className="text-sm text-neutral-400">
          CLABE: 0585 8025 0360 6001 16
        </p>
      </div>
      <p className="my-1 text-xs text-neutral-500">
        Carga tu comprobante de pago
      </p>
      {!pedido?.metodoPago?.comprobanteSelected && (
        <label htmlFor="file">
          <input
            id="file"
            type="file"
            accept="image/*, application/pdf"
            name="file"
            className="hidden"
            onChange={handleInputFile}
          ></input>
          <div
            className="
                text-white flex-wrap
                font-normal
                text-xs
                mb-0
                flex
                flex-row
                gap-2
                items-center
                cursor-pointer
                bg-blue-500
                hover:bg-blue-300
                rounded-md
                px-2
                py-1
                w-32
                justify-center
                "
          >
            <MdCloudUpload className="text-white" size={16} color="#FFFFFF" />
            <p>Seleccionar</p>
          </div>
          <p className="text-xs text-red-600 m-2">
            {pedido?.metodoPago?.comprobanteErrorMessage}
          </p>
        </label>
      )}
      {pedido?.metodoPago?.comprobanteSelected &&
        pedido?.metodoPago?.comprobanteString != "" && (
          <div className="my-2 mx-3 flex flex-col">
            <Image
              src={
                pedido?.metodoPago?.comprobanteString
                  ? pedido?.metodoPago?.comprobanteString
                  : pdfPlaceholder
              }
              width={100}
              height={150}
              alt="Comprobante"
            />
            <p className="text-xs text-blue-500">{imageName}</p>
            <div className="flex flex-row gap-2 mt-2">
              <div>
                <label htmlFor="file">
                  <input
                    id="file"
                    type="file"
                    accept="image/*, application/pdf"
                    name="file"
                    className="hidden"
                    onChange={handleInputFile}
                  ></input>
                  <p className="text-neutral-500 text-xs cursor-pointer">
                    Cambiar
                  </p>
                </label>
              </div>
              <div onClick={handleQuitarFile}>
                <p className="text-red-500 text-xs cursor-pointer">Quitar</p>
              </div>
            </div>
            <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
          </div>
        )}

      {/*  <button onClick={handleUploadFile}>Cargar archivo</button> */}
    </div>
  );
};

export default ComprobanteInput;
