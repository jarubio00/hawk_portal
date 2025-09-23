"use client";

import { useContext, useEffect, useState, useRef } from "react";
import { PedidoContext } from "@/app/portal/crear/context/PedidoContext";
import { PedidoContextType } from "@/app/types/pedido";
import { GrCloudUpload } from "react-icons/gr";
import { MdCloudUpload } from "react-icons/md";
import Image from "next/image";
import { preUploadFile, uploadFile } from "@/app/actions/apiQuerys";
import axios from "axios";
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

  const stopProgress = () => {
    if (progressInterval.current) clearInterval(progressInterval.current);
    setProgress(100);
    setTimeout(() => {
      pv2.updateComprobanteLoading(false);
      pv2.updateTransferSelected(true);
    }, 500); // pequeño delay para transición
  };

  const handleInputFile = async (event: any) => {
    let file = null;
    let fileType = "";

    if (event.target.files[0].type.match(/^image\//)) {
      file = event.target.files[0];
      await pv2.updateComprobanteFile(event.target.files[0]);
      fileType = "imagen";
    } else if (event.target.files[0].type.match(/\/pdf/)) {
      file = event.target.files[0];
      await pv2.updateComprobanteFile(event.target.files[0]);
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
      //setImageFile(file);
      const fileMb = parseFloat((file.size / (1024 * 1024)).toFixed(2));

      if (fileMb >= 10) {
        pv2.updateComprobanteFile(undefined);
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
    pv2.updateComprobanteFile(undefined);
    pv2.updateComprobanteUploaded(false);
    pv2.updateTransferSelected(false);
    saveMetodoPago({
      ...pedido?.metodoPago,
      comprobanteSelected: false,
      comprobanteString: "",
      comprobanteError: false,
      comprobanteErrorMessage: "",
      passed: false,
    });

    setImage("");
    setErrorMessage("");
  };

  const handleuploadFile = async (file: UploadFile) => {
    if (file.file) {
      let formData = new FormData();
      formData.append("file", file?.file);
      formData.append("fileName", file?.fileName);
      formData.append("pedido", `${file.pedidoId}`);

      //const up = await preUploadFile(formData);
      const up = await directUpload(formData);
    } else {
      console.log("no comprobanteFile");
    }
  };

  const directUpload = async (props: FormData) => {
    pv2.updateComprobanteLoading(true);
    simulateProgress();
    const result = await axios
      .post(`/api/preupload`, props)
      .then((response) => {
        const url: string = response.data.downloadUrl ?? "";
        const isValid = url.includes("googleapis");

        pv2.updateComprobanteUrl(url ?? "");
        stopProgress();
        pv2.updateComprobanteUploaded(isValid);
      })
      .catch((error) => {
        console.log("Error en preupload");
        console.log(error);
        pv2.updateComprobanteLoading(false);
      });
  };

  return (
    <div className="flex flex-col">
      <div className={`${pv2.comprobanteFile ? "mb-2" : "mb-6"} `}>
        <p className="text-xl text-rose-500 font-bold mb-0">BANREGIO</p>

        <p className="text-xs font-semibold">Eslo Regiomontana S.A. DE C.V.</p>
        <p className="text-xs text-neutral-400">CUENTA: 025-03606-001-1</p>
        <p className="text-xs text-neutral-400">
          CLABE: 0585 8025 0360 6001 16
        </p>
      </div>

      {!pv2.comprobanteFile ? (
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
                className="absolute -top-[10px] -right-[10px] flex items-center justify-center "
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
