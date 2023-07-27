'use client';
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
    } from "@/components/ui/alert-dialog"
import PdfImageView from "./PdfImageView";
import { useState } from "react";

interface ComprobanteDialogProps {
 pedidoId: number;
 url: string;
}

const ComprobanteDialog: React.FC<ComprobanteDialogProps> = ({
 pedidoId,
 url
}) => {
    const [open,setOpen] = useState(false);

    //data.comprobanteUrl && data?.comprobanteUrl.toLowerCase().includes('.pdf')
 return (
    <AlertDialog open={open} onOpenChange={setOpen}>
        <div onClick={() => setOpen(true)}>
            <p className="text-xs text-blue-500 px-1 my-2 ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-none cursor-pointer">Ver comprobante</p>
        </div>
        <AlertDialogContent className="z-[9999] max-h-[90vh] focus:outline-none ring-0 ring-offset-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:shadow-none focus-visible:shadow-none">
            <AlertDialogHeader>
                <AlertDialogTitle>Comprobante de pago de envío {pedidoId}</AlertDialogTitle>
            </AlertDialogHeader>
            <div className="h-[60vh] relative">
                {url && 
                <>
                    {url.toLowerCase().includes('.pdf') ? 
                    <PdfImageView url={url}/>
                    :
                    <Image src={url} 
                        fill
                        style={{ objectFit: 'contain'}}
                        alt='Comprobante'
                        />}
                   </> 
                }
            </div>
            <AlertDialogFooter>
                <AlertDialogAction><div className="w-20">Salir</div></AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
 );
}

export default ComprobanteDialog;