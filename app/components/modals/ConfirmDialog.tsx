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

interface ConfirmDialogProps {
  isOpen?: boolean;
  onClose: (props: any) => void;
  dialogContent: any;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  dialogContent,
}) => {
  const handleClose = useCallback(() => {
    onClose(true);
  }, [onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <Dialog
        open={isOpen}
        onOpenChange={(v) =>
          v
            ? onClose({
                confirm: true,
                data: dialogContent.data,
                tipo: dialogContent.tipo,
              })
            : onClose({ confirm: false })
        }
      >
        <DialogContent className=" ">
          <DialogHeader>
            <DialogTitle> {dialogContent.title}</DialogTitle>
            <DialogDescription>{dialogContent.notes}</DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="destructive"
              onClick={() =>
                onClose({
                  confirm: true,
                  data: dialogContent.data,
                  tipo: dialogContent.tipo,
                })
              }
              className="px-2"
            >
              Salir y perder datos
            </Button>
            <Button
              variant="secondary"
              onClick={() => onClose({ confirm: false })}
              className="px-2"
            >
              Quedarme
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ConfirmDialog;
