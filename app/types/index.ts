import { Direccion, Destino, User } from "@prisma/client";

export type SafeDireccion = Omit<Direccion, "createdAt"> & {
  createdAt: string;
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

export type ApiResponse = {
  status: Status;
  statusMessage: string;
  response?: object; 
}