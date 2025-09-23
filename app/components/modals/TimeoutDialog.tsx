"use client";

import { useCallback, useEffect, useState, Fragment } from "react";
import { IoMdClose } from "react-icons/io";
import { FaInfoCircle } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface TimeoutDialogProps {
  isOpen?: boolean;
  onClose: (props: any) => void;
}

const TimeoutDialog: React.FC<TimeoutDialogProps> = ({ isOpen, onClose }) => {
  const handleClose = useCallback(() => {
    onClose(true);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Dialog open={isOpen}>
        <DialogContent
          className=" "
          onEscapeKeyDown={(e) => e.preventDefault()}
          onPointerDownOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Tiempo agotado</DialogTitle>
            <DialogDescription>
              El tiempo para completar tu envío se ha agotado, porfavor
              selecciona de nuevo las fechas.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="destructive" onClick={onClose} className="px-2">
              Cancelar envío
            </Button>
            {/* <Button variant="secondary" onClick={onClose} className="px-2">
              Seleccionar fechas
            </Button> */}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TimeoutDialog;
