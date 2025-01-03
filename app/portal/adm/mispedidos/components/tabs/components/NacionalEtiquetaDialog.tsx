"use client";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import PdfImageView from "./PdfImageView";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdDownload } from "react-icons/md";

interface NacionalEtiquetaDialogProps {
  title: string;
  url: string;
}

const NacionalEtiquetaDialog: React.FC<NacionalEtiquetaDialogProps> = ({
  title,
  url,
}) => {
  console.log(url);
  const [open, setOpen] = useState(false);

  //data.comprobanteUrl && data?.comprobanteUrl.toLowerCase().includes('.pdf')
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="px-4">
          <div className="flex flex-row gap-2 items-center justify-center">
            <MdDownload />
            <p>{title}</p>
          </div>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="h-[700px]">
        <div className="h-[400px] relative">
          {url && (
            <>
              {url.toLowerCase().includes(".pdf") ? (
                <PdfImageView url={url} />
              ) : (
                <Image
                  src={url}
                  fill
                  style={{ objectFit: "contain" }}
                  alt="Comprobante"
                />
              )}
            </>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel className="px-4 cursor-pointer">
            Salir
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NacionalEtiquetaDialog;
