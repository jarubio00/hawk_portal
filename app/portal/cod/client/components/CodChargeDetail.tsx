"use client";

import { Cod2Charge } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import {
  Package,
  DollarSign,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  User,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CodChargeDetailProps {
  charge: Cod2Charge | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CodChargeDetail({
  charge,
  isOpen,
  onClose,
}: CodChargeDetailProps) {
  if (!charge) return null;

  function currencyFormat(num: number) {
    return Number(num / 100)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      INITIATED: "Programado",
      IN_ROUTE: "En Ruta",
      ATTEMPTED: "Intentado",
      PARTIALLY_COLLECTED: "Cobrado Parcial",
      COLLECTED: "Cobrado",
      CANCELLED: "Cancelado",
      UNCOLLECTIBLE: "No Cobrable",
      HANDED_IN: "Entregado",
      SETTLED_TO_CLIENT: "Liquidado",
    };
    return labels[status] || status;
  }

  function getAttemptResultLabel(result: string): string {
    const labels: Record<string, string> = {
      SUCCESS: "Éxito",
      PARTIAL: "Parcial",
      FAILED: "Fallido",
    };
    return labels[result] || result;
  }

  function getIssueTypeLabel(type: string): string {
    const labels: Record<string, string> = {
      AMOUNT_LESS: "Monto Menor",
      AMOUNT_MORE: "Monto Mayor",
      REFUSED_TO_PAY: "Se Negó a Pagar",
      RECIPIENT_ABSENT: "Destinatario Ausente",
      INCORRECT_ADDRESS: "Dirección Incorrecta",
      COUNTERFEIT_BILL: "Billete Falso",
      OTHER: "Otro",
    };
    return labels[type] || type;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Cobro - Envío #{charge.pedidoId}
          </DialogTitle>
          <DialogDescription>
            Información completa del cobro a destinatario
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(90vh-120px)]">
          <div className="space-y-4 pr-4">
            {/* Información General */}
            <Card className="p-4 border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Información General
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Estado</p>
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {getStatusLabel(charge.status)}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">ID de Cobro</p>
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {charge.id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monto Solicitado</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${currencyFormat(charge.amountRequested)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monto Cobrado</p>
                  <p className="text-lg font-bold text-green-600">
                    ${currencyFormat(charge.amountCollected)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Creado</p>
                  <p className="text-sm text-gray-900">
                    {formatDate(charge.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Última Actualización</p>
                  <p className="text-sm text-gray-900">
                    {formatDate(charge.updatedAt)}
                  </p>
                </div>
              </div>
            </Card>

            {/* Historial de Intentos */}
            {charge.attempts && charge.attempts.length > 0 && (
              <Card className="p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Historial de Intentos ({charge.attempts.length})
                </h3>
                <div className="space-y-3">
                  {charge.attempts.map((attempt, index) => (
                    <div
                      key={attempt.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-gray-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="outline"
                            className={
                              attempt.result === "SUCCESS"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : attempt.result === "PARTIAL"
                                ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {getAttemptResultLabel(attempt.result)}
                          </Badge>
                          {attempt.amount > 0 && (
                            <span className="text-sm font-semibold text-gray-900">
                              ${currencyFormat(attempt.amount)}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mb-2">
                          {formatDate(attempt.attemptedAt)}
                        </p>
                        {attempt.reason && (
                          <p className="text-xs text-gray-600 mb-2">
                            {attempt.reason}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                          {(attempt.geotagLat || attempt.geotagLng) && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>
                                {attempt.geotagLat}, {attempt.geotagLng}
                              </span>
                            </div>
                          )}
                          {attempt.evidenceUrl && (
                            <a
                              href={attempt.evidenceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
                            >
                              <ImageIcon className="h-3 w-3" />
                              <span>Ver evidencia</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Información de Pago */}
            {charge.payment && (
              <Card className="p-4 border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Información de Pago
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Método</p>
                    <p className="text-sm font-medium text-gray-900">
                      {charge.payment.method}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Monto</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${currencyFormat(charge.payment.amount)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Fecha de Cobro</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(charge.payment.collectedAt)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Estado de Entrega</p>
                    <Badge
                      variant="outline"
                      className={
                        charge.payment.handedIn
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-yellow-50 text-yellow-700 border-yellow-200"
                      }
                    >
                      {charge.payment.handedIn ? "Entregado" : "Pendiente"}
                    </Badge>
                  </div>
                  {charge.payment.notes && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500 mb-1">Notas</p>
                      <p className="text-sm text-gray-900">
                        {charge.payment.notes}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Incidencias */}
            {charge.issues && charge.issues.length > 0 && (
              <Card className="p-4 border border-red-200 bg-red-50">
                <h3 className="text-sm font-semibold text-red-900 mb-3 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Incidencias ({charge.issues.length})
                </h3>
                <div className="space-y-3">
                  {charge.issues.map((issue) => (
                    <div
                      key={issue.id}
                      className="p-3 bg-white rounded-lg border border-red-200"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-700 border-red-300"
                        >
                          {getIssueTypeLabel(issue.type)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            issue.status === "OPEN"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : issue.status === "RESOLVED"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        >
                          {issue.status}
                        </Badge>
                      </div>
                      {issue.description && (
                        <p className="text-sm text-gray-700 mb-2">
                          {issue.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        {formatDate(issue.createdAt)}
                      </p>
                      {issue.evidenceUrl && (
                        <a
                          href={issue.evidenceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 mt-2"
                        >
                          <ImageIcon className="h-3 w-3" />
                          Ver evidencia
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
