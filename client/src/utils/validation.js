import { z } from "zod";

export const nameSchema = z
  .string()
  .trim()
  .min(3, "Ingresá tu nombre y apellido");

export const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[\d\s-]{8,}$/, "Ingresá un teléfono válido");

export const passwordSchema = z
  .string()
  .min(8, "Usá al menos 8 caracteres")
  .regex(/[A-Za-z]/, "Incluí al menos una letra")
  .regex(/\d/, "Incluí al menos un número");
