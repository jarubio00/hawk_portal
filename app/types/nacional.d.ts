export type NacionalCodigoPostalType = {
  base: string;
  cp: string;
  municipio: string;
  colonias: Colonia[];
};

export type Colonia = {
  id: number;
  colonia: string;
  codigoPostalId: number;
  codigoPostalString: string;
  desc: string | null;
};
