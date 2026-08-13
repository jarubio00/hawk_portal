"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import { GrCloudUpload } from "react-icons/gr";
import { MdCloudUpload } from "react-icons/md";
import Image from "next/image";
import axios from "axios";
import { esComprobanteUrlValida } from "@/app/utils/comprobante";
import { FaCircleMinus } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import { useProgramaStore } from "../store/crear-store";
import ReceiptPreview from "./ComprobanteImage";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import FileLightboxContent from "./ComprobanteViewer";
import PdfImageDialog from "./ComprobanteDialogViewer";

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
  const [progress, setProgress] = useState<number>(0);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);
  const [open, setOpen] = useState(false);
  const pv2 = useProgramaStore();

  const simulateProgress = () => {
    setProgress(0);
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev; // Espera la respuesta final para llegar a 100%
        return prev + Math.random() * 5;
      });
    }, 200);
  };

  const clearProgressInterval = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  /** Solo se llama cuando el comprobante quedó realmente cargado. */
  const finalizarProgreso = () => {
    clearProgressInterval();
    setProgress(100);
    setTimeout(() => {
      pv2.updateComprobanteLoading(false);
      pv2.updateTransferSelected(true);
    }, 500); // pequeño delay para transición
  };

  /**
   * Deja el estado como si nunca se hubiera cargado nada y muestra el motivo.
   * Antes el .catch solo apagaba el spinner: el usuario seguía viendo su archivo
   * en pantalla creyendo que se había subido.
   */
  const fallarCarga = (mensaje: string) => {
    clearProgressInterval();
    setProgress(0);
    setFileSelected(false);
    setImage("");
    setErrorMessage(mensaje);

    pv2.updateComprobanteLoading(false);
    pv2.updateComprobanteFile(undefined);
    pv2.updateComprobanteUrl("");
    pv2.updateComprobanteUploaded(false);
    pv2.updateTransferSelected(false);

    saveMetodoPago({
      ...pedido?.metodoPago,
      formaPagoId: 2,
      passed: false,
      comprobante: false,
      comprobanteUrl: "",
      comprobanteSelected: false,
      comprobanteError: true,
      comprobanteErrorMessage: mensaje,
    });
  };

  const rechazarArchivo = (mensaje: string) => {
    pv2.updateComprobanteFile(undefined);
    setErrorMessage(mensaje);
    saveMetodoPago({
      ...pedido?.metodoPago,
      comprobanteError: true,
      comprobanteErrorMessage: mensaje,
    });
  };

  const handleInputFile = async (event: any) => {
    const seleccionado: File | undefined = event.target.files?.[0];
    event.target.value = null;

    if (!seleccionado) return;

    let fileType = "";
    if (seleccionado.type.match(/^image\//)) {
      fileType = "imagen";
    } else if (seleccionado.type.match(/\/pdf/)) {
      fileType = "pdf";
    } else {
      // Antes no se cortaba aquí y más abajo se leía file.name sobre null,
      // lo que reventaba el input.
      rechazarArchivo("Formato no soportado");
      return;
    }

    const fileMb = parseFloat((seleccionado.size / (1024 * 1024)).toFixed(2));
    if (fileMb >= 10) {
      rechazarArchivo("El archivo excede el tamaño máximo (10Mb)");
      return;
    }

    const file = seleccionado;
    await pv2.updateComprobanteFile(file);

    setErrorMessage("");
    saveMetodoPago({
      ...pedido?.metodoPago,
      comprobanteError: false,
      comprobanteErrorMessage: "",
    });

    setFileType(fileType);
    setImage(fileType === "imagen" ? URL.createObjectURL(file) : pdfPlaceholder);
    setImageName(file.name);
    setFileSelected(true);

    const filetoUpload: UploadFile = {
      file: file,
      fileName: file.name,
      pedidoId: 88443322,
    };

    await handleuploadFile(filetoUpload);
  };

  const handleQuitarFile = () => {
    setFileSelected(false);
    pv2.updateComprobanteFile(undefined);
    pv2.updateComprobanteUrl("");
    pv2.updateComprobanteUploaded(false);
    pv2.updateTransferSelected(false);
    saveMetodoPago({
      ...pedido?.metodoPago,
      comprobanteSelected: false,
      comprobanteString: "",
      // sin esto quedaba viva la URL del archivo que el usuario acaba de quitar
      comprobante: false,
      comprobanteUrl: "",
      comprobanteError: false,
      comprobanteErrorMessage: "",
      passed: false,
    });

    setImage("");
    setErrorMessage("");
  };

  const handleuploadFile = async (file: UploadFile) => {
    if (!file.file) return;

    let formData = new FormData();
    formData.append("file", file?.file);
    formData.append("fileName", file?.fileName);
    formData.append("pedido", `${file.pedidoId}`);

    await directUpload(formData);
  };

  const directUpload = async (props: FormData) => {
    pv2.updateComprobanteLoading(true);
    simulateProgress();

    try {
      const response = await axios.post(`/api/preupload`, props);
      const url: string = response.data?.downloadUrl ?? "";

      // El éxito lo define la URL, no el hecho de que la petición no reventara.
      if (!esComprobanteUrlValida(url)) {
        fallarCarga("No se pudo cargar el comprobante. Vuelve a intentarlo.");
        return;
      }

      pv2.updateComprobanteUrl(url);
      pv2.updateComprobanteUploaded(true);
      saveMetodoPago({
        ...pedido?.metodoPago,
        formaPagoId: 2,
        passed: true,
        comprobante: true,
        comprobanteUrl: url,
        comprobanteSelected: true,
        comprobanteError: false,
        comprobanteErrorMessage: "",
      });
      finalizarProgreso();
    } catch (error) {
      fallarCarga(
        "No se pudo cargar el comprobante. Revisa tu conexión y vuelve a intentarlo."
      );
    }
  };

  return (
    <div className="flex flex-col w-full ">
      <div className={`${pv2.comprobanteFile ? "mb-2" : "mb-6"} `}>
        <p className="text-xl text-rose-500 font-bold mb-0">BANREGIO</p>

        <p className="text-xs font-semibold">Eslo Regiomontana S.A. DE C.V.</p>
        <p className="text-xs text-neutral-400">CUENTA: 025-03606-001-1</p>
        <p className="text-xs text-neutral-400">
          CLABE: 0585 8025 0360 6001 16
        </p>
      </div>

      {!pv2.comprobanteFile ? (
        <label htmlFor="file" className="w-full">
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
                mb-2
                mt-4
                flex
                flex-row
                gap-2
                items-center
                cursor-pointer
                border-2
                hover:bg-neutral-100
                rounded-md
                px-4
                py-4
                w-full
                justify-center
                "
          >
            <MdCloudUpload className="text-rose-500" size={16} />
            <p className="text-black">Cargar comprobante</p>
          </div>
          <p className="text-xs text-red-600 m-2">
            {pedido?.metodoPago?.comprobanteErrorMessage}
          </p>
        </label>
      ) : (
        <div className="my-2 flex flex-col w-full justify-center items-center">
          <div className="flex flex-row gap-8">
            <div
              className={`relative ${pv2.comprobanteLoading ? "blur-sm " : ""}`}
            >
              <ReceiptPreview
                file={pv2.comprobanteFile}
                portraitSize={{ width: 100, height: 180 }}
                landscapeSize={{ width: 210, height: 140 }}
                onOpen={pv2.comprobanteLoading ? () => {} : () => setOpen(true)}
              />
              <div
                className="absolute -top-[10px] -right-[10px] flex items-center justify-center cursor-pointer "
                onClick={
                  pv2.comprobanteLoading ? () => {} : () => handleQuitarFile()
                }
              >
                {
                  <TiDelete
                    className={`text-black w-[24px] h-[24px] bg-white rounded-full`}
                  />
                }
              </div>
            </div>
          </div>
          <PdfImageDialog
            open={open}
            onOpenChange={setOpen}
            file={pv2.comprobanteFile}
            title="Comprobante"
          />

          {pv2.comprobanteLoading && (
            <div className="w-[200px] h-3 bg-gray-300">
              <div
                className="h-full bg-blue-600 transition-all text-[9px] text-white"
                style={{ width: `${progress}%` }}
              >
                <p className="ml-3">{progress.toFixed(0)}%</p>
              </div>
            </div>
          )}

          <p className="text-xs text-red-600 mt-2">{errorMessage}</p>
        </div>
      )}

      {/*  <button onClick={handleUploadFile}>Cargar archivo</button> */}
    </div>
  );
};

export default ComprobanteInput;
