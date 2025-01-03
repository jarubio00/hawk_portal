"use client";

import { dateString, dateStringDHL } from "@/app/components/utils/helpers";
import { NacionalShipment } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { MdDownload } from "react-icons/md";
import { BarLoader } from "react-spinners";
import { useNacionalCrearStore } from "../../store/nacional/nacionalCrear/nacional-crear";

interface ConfirmarCardProps {
  data?: string;
}

const ConfirmarCard: React.FC<ConfirmarCardProps> = ({ data }) => {
  const {
    currentUser,
    destinoSelected,
    updateActiveStep,
    cotizacionSelected,
    dateSelected,
    direccionSelected,
    largoValue,
    anchoValue,
    altoValue,
    pesoValue,
    shipmentLoading,
    updateShipmentLoading,
    createShipment,
    shipments,
    order,
  } = useNacionalCrearStore();

  const onCreate = () => {
    const plannedDate = dateStringDHL(dateSelected);
    //console.log(plannedDate);
    //@ts-ignore
    const shipment: NacionalShipment = {
      partnerId: 1,
      partnerClienteId: currentUser?.id.toString() ?? "1",
      sellPrice: cotizacionSelected?.totalPrice ?? 1,
      plannedShippingDateAndTime: plannedDate,
      pickup: false,
      productCode: cotizacionSelected?.code ?? "N",
      shipperDetails: {
        postalAddress: {
          postalCode: direccionSelected?.cpId.toString() ?? "",
          cityName: direccionSelected?.municipio.municipio ?? "",
          countryCode: "MX",
          addressLine1: `${direccionSelected?.calle} ${direccionSelected?.numero}`,
          addressLine2: `Col. ${direccionSelected?.colonia}`,
          addressLine3: "N",
          countryName: "MEXICO",
        },
        contactInformation: {
          email: currentUser?.email ?? "",
          phone: direccionSelected?.contactoTel ?? "",
          mobilePhone: currentUser?.celular ?? "",
          companyName: direccionSelected?.empresa ?? "",
          fullName: direccionSelected?.contactoNombre ?? "",
        },
        addressTypeCode: "business",
      },
      receiverDetails: {
        postalAddress: {
          postalCode: destinoSelected?.cpId.toString() ?? "",
          cityName: destinoSelected?.municipioId ?? "",
          countryCode: "MX",
          addressLine1: `${destinoSelected?.calle} ${destinoSelected?.numero}`,
          addressLine2: `Col. ${destinoSelected?.colonia}`,
          addressLine3: "N",
          countryName: "MEXICO",
        },
        contactInformation: {
          email: currentUser?.email ?? "",
          phone: destinoSelected?.contactoTel ?? "",
          mobilePhone: currentUser?.celular ?? "",
          companyName: destinoSelected?.empresa ?? "",
          fullName: destinoSelected?.contactoNombre ?? "",
        },
        addressTypeCode: "business",
      },
      packageContent: {
        packageType: "2BP",
        weight: parseInt(pesoValue),
        length: parseInt(largoValue),
        width: parseInt(anchoValue),
        height: parseInt(altoValue),
        description: "Shipment Description",
      },
    };
    //console.log(shipment);

    createShipment(shipment);
  };

  return (
    <div className="flex flex-col gap-2 w-1/2 mt-4">
      <div className="flex flex-col gap-2 bg-gray-100   rounded-md px-0 py-0">
        <div className="p-1 bg-neutral-900 text-white rounded-t-md">
          <p className="text-center text-xl uppercase font-bold">RESUMEN</p>
        </div>

        <div className="px-4 my-2">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="text-xs uppercase">RECOLECCIÓN</p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="text-xs ">
                {direccionSelected?.calle} {direccionSelected?.numero}{" "}
                {direccionSelected?.numeroInt}, {direccionSelected?.colonia}
              </p>
              <p className="text-xs font-bold">
                {direccionSelected?.municipio.municipio}, CP:{" "}
                {direccionSelected?.cpId}
              </p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="text-xs uppercase">DESTINO</p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="text-xs ">
                {destinoSelected?.calle} {destinoSelected?.numero}{" "}
                {destinoSelected?.numeroInt}, {destinoSelected?.colonia}
              </p>
              <p className="text-xs font-bold">
                {destinoSelected?.municipioId}, CP: {destinoSelected?.cpId}
              </p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="text-xs uppercase">PAQUETE</p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="text-xs ">
                {largoValue} cm x {anchoValue} cm x {altoValue} cm
              </p>
              <p className="text-xs font-bold">{pesoValue} kg</p>
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col">
              <p className="text-md uppercase">{cotizacionSelected?.name}</p>
              <div className="p-1 w-16 bg-yellow-700">
                {" "}
                <img src="/images/nacional/dhl-logo.svg" className="w-16" />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm font-bold">
                MXN ${cotizacionSelected?.totalPrice.toFixed(2)}
              </p>
              {cotizacionSelected?.shipmentProtectionPrice &&
              cotizacionSelected?.shipmentProtectionPrice != 0 ? (
                <p className="text-[11px]">
                  + MXN {cotizacionSelected?.shipmentProtectionPrice} seguro
                </p>
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <Separator className="my-2" />
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-col"></div>
            <div className="flex flex-col ">
              {cotizacionSelected?.totalPrice &&
              cotizacionSelected?.shipmentProtectionPrice ? (
                <p className="text-xl font-bold">
                  MXN $
                  {(
                    cotizacionSelected?.totalPrice +
                    cotizacionSelected?.shipmentProtectionPrice
                  ).toFixed(2)}
                </p>
              ) : (
                <p className="text-xl font-bold">
                  MXN ${cotizacionSelected?.totalPrice.toFixed(2) ?? 0}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {!order && (
        <Button
          onClick={() => {
            onCreate();
          }}
          disabled={shipmentLoading}
        >
          Crear envío
        </Button>
      )}
      <div className="mb-2">
        {shipmentLoading && <BarLoader width={"100%"} color="#f16e10" />}
      </div>
      {!shipmentLoading && order && (
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="">Tu envío a sido generado.</p>
          <p className="text-lg font-bold">
            No.guía {order.data.carrierTrackingNumber}
          </p>
          <div className="flex flex-row gap-4">
            <a target="_blank" href={order.data.carrierLabelCloudUrl}>
              <Button className="px-4">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <MdDownload />
                  <p>Etiqueta</p>
                </div>
              </Button>
            </a>
            <a target="_blank" href={order.data.carrierWaybillCloudUrl}>
              <Button className="px-4">
                <div className="flex flex-row gap-2 items-center justify-center">
                  <MdDownload />
                  <p>Recibo</p>
                </div>
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmarCard;
