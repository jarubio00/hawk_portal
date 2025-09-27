import {
  Direccion,
  Destino,
  User,
  Paquete,
  Recoleccion,
  Pedido,
  CobrosDestino,
  Operaciones,
  Incidencia,
  IncidenciaFoto,
} from "@prisma/client";
import { CodeStatus, ConfirmationType } from "./constants";

export type SafeDireccion = Omit<Direccion, "createdAt"> & {
  createdAt: string;
  default?: Boolean;
  municipio: any;
};

export type Tarifa = {
  code: string;
  name: string;
  totalPrice: number;
  transportSubTotal: number;
  transportTax: number;
  transportTotal: number;
  fuelSubTotal: number;
  fuelTax: number;
  fuelTotal: number;
  weightVolumetric: number;
  weightProvided: number;
  shipmentProtectionPrice?: number;
  shipmentProtectionValue?: number;
  estimatedDeliveryDateAndTime?: Date;
};

export type NacionalDestino = {
  cpId: string;
  colonia: string;
  municipioId: string;
  calle: string;
  numero: string;
  numeroInt: string;
  empresa?: string;
  referencias: string;
  contactoNombre: string;
  contactoTel: string;
  otraColoniaNombre: string;
  countryCode: string;
  save: boolean;
};

export type NacionalOrigen = {
  cpId: string;
  colonia: string;
  municipioId: string;
  calle: string;
  numero: string;
  numeroInt: string;
  empresa?: string;
  referencias: string;
  contactoNombre: string;
  contactoTel: string;
  otraColoniaNombre: string;
  countryCode: string;
  save: boolean;
};

export type NacionalPaquete = {
  typeCode: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  description: string;
};

export type SafePaquete = Omit<Paquete, "createdAt"> & {
  createdAt: string;
  tipo: any;
};

export type SafeDestino = Omit<Destino, "createdAt"> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
};

enum Status {
  ok = 1,
  error = 2,
}

type Response = {
  data: any;
  status?: any;
  error?: any;
};

export type ApiResponse = {
  status: Status;
  statusMessage: string;
  response?: Response;
};

export type ServerDate = {
  hours: number;
  minutes: number;
  seconds: number;
  month: number;
  year: number;
  dayNumber: number;
  day: number;
  totalMinutes: number;
  composedFullDate: Date;
  composedDate: Date;
};

export type SafeRecoleccion = Omit<Recoleccion, "pedidos"> & {
  id: number;
  estatus: any;
  pedidos: Pedido[];
  municipio: any;
};

export type SafePedido = Omit<Pedido, "pedidos"> & {
  id: number;
  estatus: any;
  municipio: any;
  recoleccion: SafeRecoleccion;
  tipoPaquete: any;
  formaPago: any;
  estatusPedido: any;
  operaciones: SafeOperaciones;
  incidencias: SafeIncidencia[];
};

export type SafeCobro = Omit<CobrosDestino, "cobros"> & {
  id: number;
  pedido: SafePedido;
  estatusCobro: any;
  estatusPagoCobro: any;
  retornoForma: any;
};

export type SafeOperaciones = Omit<Operaciones, "operaciones"> & {
  id: number;
};

export type SafeIncidencia = Omit<Incidencia, "incidencia"> & {
  id: number;
  fotos: SafeIncidenciaFoto[];
  motivo: any;
};

export type SafeIncidenciaFoto = Omit<IncidenciaFoto, "fotos"> & {
  id: number;
};

export type RegisterFormType = {
  email: string;
  nombre: string;
  password: string;
  confirmPassword: string;
  celular: string;
  countryCode: string;
  type?: string;
  status?: string;
  code?: number;
};

export type LoginFormType = {
  email: string;
  password: string;
};

export type ForgotFormType = {
  email: string;
};
export type ForgotChangeFormType = {
  newPassword: string;
  confirmPassword: string;
};

export type PasswordChangeFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type PhoneConfirmFormType = {
  celular: string;
  type?: string;
  countryCode: string;
};

export type SafeRastreo = {
  programado?: boolean;
  programadoAt?: Date;
  enRutaRec?: boolean;
  enRutaRecAt?: Date;
  recolectado?: boolean;
  recolectadoAt?: Date;
  enRutaEnt?: boolean;
  enRutaEntAt?: Date;
  entregado?: boolean;
  entregadoAt?: Date;
  incidenciaRec?: boolean;
  cantidadInciRec?: Number;
  motivoUltimaInciRec?: string;
  timeStampUltimaInciRec?: Date;
  leyendaInciRec?: string;
  incidenciaEnt?: boolean;
  cantidadInciEnt?: Number;
  motivoUltimaInciEnt?: string;
  timeStampUltimaInciEnt?: Date;
  leyendaInciEnt?: string;
  estatusGuia?: Number;
};

export type SafeRastreoOrig = {
  programado?: boolean;
  programadoAt?: Date;
  enRutaRec?: boolean;
  enRutaRecAt?: Date;
  recolectado?: boolean;
  recolectadoAt?: Date;
  enRutaEnt?: boolean;
  enRutaEntAt?: Date;
  entregado?: boolean;
  entregadoAt?: Date;
  incidenciaRec?: boolean;
  incidenciaRecAt?: Date;
  incidenciaEnt?: boolean;
  incidenciaEntAt?: Date;
};

export type ShipmentRequest = {
  plannedShippingDateAndTime: Date;
  pickup: false;
  productCode: string;
  shipperDetails: {
    postalAdrress: PostalAddress;
    contactInformation: contactInformation;
  };
  receiverDetails: {
    postalAdrress: PostalAddress;
    contactInformation: contactInformation;
  };
  packageContent: ShipmentContent;
};

export type PostalAddress = {
  postalCode: string;
  cityName: string;
  countryCode: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  countryName: string;
  addressType: string;
};

export type contactInformation = {
  email: string;
  phone: string;
  mobilePhone: string;
  companyName: string;
  fullName: string;
};

export type ShipmentContent = {
  packageType: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  description: string;
};

export type NacionalShipment = {
  partnerId: number;
  partnerClienteId: string;
  sellPrice: number;
  plannedShippingDateAndTime: string;
  pickup: boolean;
  productCode: string;
  shipperDetails: NacionalAddressDetails;
  receiverDetails: NacionalAddressDetails;
  packageContent: NacionalPackageContent;
};

export type NacionalPackageContent = {
  packageType: string;
  weight: number;
  length: number;
  width: number;
  height: number;
  description: string;
};

export type NacionalAddressDetails = {
  postalAddress: NacionalPostalAddress;
  contactInformation: NacionalContactInformation;
  addressTypeCode: string;
};

export type NacionalContactInformation = {
  email: string;
  phone: string;
  mobilePhone: string;
  companyName: string;
  fullName: string;
};

export type NacionalPostalAddress = {
  postalCode: string;
  cityName: string;
  countryCode: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  countryName: string;
};

//Programa V2

export type DateV2 = {
  dateString: string;
  datetimeString: string;
  formatLong: string;
  localeDate: Date;
};
