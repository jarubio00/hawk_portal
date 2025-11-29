"use client";
import { useEffect } from "react";
import { SafeCobro } from "@/app/types";
import { CodClientDashboardCompact } from "@/app/portal/cod/client/components/CodClientDashboardCompact";
import { useCodTutorialStore } from "@/app/portal/cod/store/useCodTutorialStore";
import { CodTutorialModal } from "@/app/portal/cod/components/CodTutorialModal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign } from "lucide-react";

interface CobrosTabProps {
  onView: (open: boolean, c: SafeCobro) => void;
  currentUser?: any;
}

const CobrosTab: React.FC<CobrosTabProps> = ({ currentUser }) => {
  const {
    serviceEnabled,
    isLoading,
    loadChecklist,
    openModal,
  } = useCodTutorialStore();

  useEffect(() => {
    if (currentUser?.id) {
      loadChecklist();
    }
  }, [currentUser?.id, loadChecklist]);

  // Skeleton mientras carga
  if (isLoading) {
    return (
      <div className="w-full py-2 flex flex-col gap-2">
        <div className="space-y-4 animate-pulse">
          <div className="grid grid-cols-2 gap-3">
            <div className="h-24 bg-gray-200 rounded-lg"></div>
            <div className="h-24 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    );
  }

  // Si el servicio no está habilitado, mostrar pantalla de habilitación
  if (!serviceEnabled) {
    return (
      <div className="w-full py-2 flex flex-col gap-2">
        <CodTutorialModal />
        <Card className="p-8 border border-gray-200">
          <div className="flex flex-col items-center justify-center text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <DollarSign className="h-8 w-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Servicio de cobros a destinatario
              </h3>
              <p className="text-sm text-gray-500 max-w-md">
                Este servicio te permite cobrar al destinatario al momento de la
                entrega. Habilítalo para comenzar a usar esta funcionalidad.
              </p>
            </div>
            <Button onClick={openModal} className="mt-2">
              Habilitar servicio
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full py-2 flex flex-col gap-2">
      <CodTutorialModal />
      {currentUser?.id && (
        <CodClientDashboardCompact clienteId={currentUser.id} />
      )}
    </div>
  );
};

export default CobrosTab;
