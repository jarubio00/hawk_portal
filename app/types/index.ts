import { Direccion, Destino, User, Paquete } from "@prisma/client";

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
  emailVerified: string | null;
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