"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCodTutorialStore } from "../store/useCodTutorialStore";
import { X } from "lucide-react";

export function CodBanner() {
  const { openModal, showBanner, serviceEnabled, dismissBanner } =
    useCodTutorialStore();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  if (!showBanner || serviceEnabled) return null;

  const handleDismissClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDismiss = () => {
    dismissBanner();
    setShowConfirmDialog(false);
  };

  const handleCancelDismiss = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Card className="border-2 border-dashed overflow-hidden relative">
        {/* Botón cerrar aviso */}
        <button
          onClick={handleDismissClick}
          className="absolute top-3 right-3 z-10 rounded-full p-1 hover:bg-gray-100 transition-colors"
          aria-label="Cerrar aviso"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>

      <CardContent className="p-4 flex flex-row items-center gap-4">
        {/* Avatar circular con sombra */}
        <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white p-2 shadow-lg border-2 border-gray-200">
          <div className="relative w-full h-full rounded-full overflow-hidden">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/hawk-admin.appspot.com/o/portal%2Fimages%2Fcobros_avatar.png?alt=media&token=84fa2916-32b2-4a23-adc8-e9923861a7c8"
              alt="Cobros avatar"
              fill
              className="object-contain"
              sizes="80px"
              priority
            />
          </div>
        </div>

        {/* Texto + botón */}
        <div className="flex-1 flex flex-col items-start pr-8">
          <h3 className="text-lg font-semibold">
            Ahora puedes programar cobros al destinatario de tus envíos
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Te depositamos el monto cobrado menos comisión. Habilítalo para
            comenzar a usarlo en tus envíos.
          </p>
          <Button
            className="mt-3 text-white"
            style={{ backgroundColor: "#eb7711" }}
            onClick={openModal}
          >
            Habilitar
          </Button>
        </div>
      </CardContent>
    </Card>

      {/* Dialog de confirmación */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ocultar aviso</DialogTitle>
            <DialogDescription>
              El aviso de cobros a destinatario se ocultará, podrás habilitar el
              servicio directamente al crear un envío.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={handleCancelDismiss}>
              Cancelar
            </Button>
            <Button onClick={handleConfirmDismiss}>Confirmar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
