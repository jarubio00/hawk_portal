import { Direccion, Destino, User, Paquete, Recoleccion, Pedido, CobrosDestino } from "@prisma/client";
import { CodeStatus, ConfirmationType } from "./constants";

export type SafeDireccion = Omit<Direccion, "createdAt"> & {
  createdAt: string;
};

export type SafePaquete = Omit<Paquete, "createdAt"> & {
  createdAt: string;
  tipo: any;
};

export type SafeDestino = Omit<
  Destino, 
  "createdAt" 
> & {
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
  error = 2
}

type Response = {
  data: any;
  status?: any;
  error?: any;
}

export type ApiResponse = {
  status: Status;
  statusMessage: string;
  response?: Response; 
}

export type SafeRecoleccion = Omit<
  Recoleccion, 
   "pedidos"
> & {
  id: number;
  estatus: any;
  pedidos: Pedido[];
  municipio: any;
};

export type SafePedido = Omit<
  Pedido, 
   "pedidos"
> & {
  id: number;
  estatus: any;
  municipio: any;
  recoleccion: SafeRecoleccion;
  tipoPaquete: any;
  formaPago: any;
  estatusPedido: any;
};

export type SafeCobro = Omit<
  CobrosDestino, 
   "cobros"
> & {
  id: number;
  pedido: SafePedido;
  estatusCobro: any;
  estatusPagoCobro: any;
  retornoForma: any;
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
}

export type LoginFormType = {
  email: string;
  password: string;
}

export type ForgotFormType = {
  email: string;
}
export type ForgotChangeFormType = {
  newPassword: string;
  confirmPassword: string;
}

export type PasswordChangeFormType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type PhoneConfirmFormType = {
  celular: string;
  type?: string;
  countryCode: string
}