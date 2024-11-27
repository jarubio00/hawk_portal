"use client";

import { dateString, dateStringDHL } from "@/app/components/utils/helpers";
import { NacionalShipment } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
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
    <div className="flex flex-col gap-8 w-1/2">
      <div className="flex flex-col gap-2 bg-gray-100   rounded-md px-4 py-2">
        <p className="text-center text-xl uppercase font-bold">RESUMEN</p>
        <Separator />
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-col">
            <p className="text-md uppercase">{cotizacionSelected?.name}</p>
            <div className="p-1 w-16 bg-yellow-700">
              {" "}
              <img src="/images/nacional/dhl-logo.svg" className="w-16" />
            </div>
          </div>
          <div className="flex flex-col ">
            <p className="text-xl font-bold">
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
      </div>
      {shipmentLoading && <BarLoader width={"100%"} color="#f16e10" />}
      <Button
        onClick={() => {
          onCreate();
        }}
        disabled={shipmentLoading}
      >
        Crear envío
      </Button>
      {!shipmentLoading && order && (
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold">
            {order.data.carrierTrackingNumber}
          </p>
          <div className="flex flex-row gap-4">
            <a target="_blank" href={order.data.carrierLabelCloudUrl}>
              Label
            </a>
            <a target="_blank" href={order.data.carrierWaybillCloudUrl}>
              Waybill
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConfirmarCard;
