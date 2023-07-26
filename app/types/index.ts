import { Direccion, Destino, User, Paquete, Recoleccion, Pedido } from "@prisma/client";

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
  pedidos: Pedido;
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