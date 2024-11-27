import * as z from "zod";
export const getSchema = () => {
  return z.object({
    cpId: z
      .string({
        required_error: "El código postal es requerido",
        invalid_type_error: "El código postal debe ser número",
      })
      .min(5, {
        message: "El código postal debe ser de 5 caracteres.",
      })
      .max(5, { message: "El código postal debe ser de 5 caracteres." }),
    colonia: z
      .string({
        required_error: "La colonia es requerida",
        invalid_type_error: "La colonia debe ser string",
      })
      .min(2, {
        message: "La colonia debe ser mayor a 2 caracteres.",
      })
      .max(120, { message: "La colonia contener máximo 120 caracteres." }),
    otraColoniaNombre: z
      .string({
        required_error: "La colonia es requerida",
        invalid_type_error: "La colonia debe ser string",
      })
      .max(120, { message: "La colonia contener máximo 120 caracteres." })
      .optional(),
    municipioId: z.string({ required_error: "El municipio es requerido" }),
    calle: z
      .string({
        required_error: "La calle es requerida",
        invalid_type_error: "La calle debe ser string",
      })
      .min(2, {
        message: "La calle debe ser mayor a 2 caracteres.",
      })
      .max(120, { message: "La calle debe contener máximo 120 caracteres." }),
    numero: z
      .string({
        required_error: "El número es requerido",
        invalid_type_error: "El número debe ser string",
      })
      .max(12, { message: "El número debe contener máximo 12 caracteres." }),
    numeroInt: z
      .string({
        required_error: "El número interior es requerido",
        invalid_type_error: "El número interior debe ser string",
      })
      .max(12, {
        message: "El número interior debe contener máximo 12 caracteres.",
      }),
    empresa: z
      .string()
      .max(120, { message: "La calle debe contener máximo 120 caracteres." })
      .optional(),
    referencias: z
      .string()
      .min(2, {
        message: "Las referencias deben ser mayor a 2 caracteres.",
      })
      .max(250, {
        message: "Las referencias deben contener máximo 250 caracteres.",
      })
      .optional(),
    contactoNombre: z
      .string({
        required_error: "El nombre de contacto es requerido",
        invalid_type_error: "El nombre de contacto debe ser string",
      })
      .min(2, {
        message: "El nombre de contacto debe ser mayor a 2 caracteres.",
      })
      .max(120, {
        message: "El nombre de contacto debe contener máximo 120 caracteres.",
      }),
    contactoTel: z
      .string()
      .min(6, { message: "El número debe ser de 10 digitos." })
      .max(10, { message: "El número debe ser de 10 digitos." }),
    countryCode: z.string({
      required_error: "El código de área es requerido",
    }),
    save: z.boolean().optional(),
  });
};
