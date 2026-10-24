import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { toMinutes, toTime } from "./time";

const formatEs = (date, pattern) => format(date, pattern, { locale: es });

export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

// Precios
export function formatPrice(amount) {
  return `$ ${new Intl.NumberFormat("es-AR").format(amount)}`;
}

// Nombres
const nameParts = (fullName) => fullName.trim().split(/\s+/);

// "Tomás Molina" → "Tomás"
export const firstName = (fullName) => nameParts(fullName)[0];

// "Tomás Molina" → "Tomás M."
export function shortName(fullName) {
  const parts = nameParts(fullName);
  const lastInitial = parts.length > 1 ? ` ${parts.at(-1)[0]}.` : "";
  return `${parts[0]}${lastInitial}`;
}

// "Tomás Molina" → "TM"
export const initials = (fullName) =>
  nameParts(fullName)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

// Fechas
// Date → "Viernes 16 de octubre"
export const formatLongDate = (date) =>
  capitalize(formatEs(date, "EEEE d 'de' MMMM"));

// Date → "Viernes 16 de octubre de 2026"
export const formatFullDate = (date) =>
  capitalize(formatEs(date, "EEEE d 'de' MMMM 'de' yyyy"));

// Date → "16 de octubre"
export const formatDayMonth = (date) => formatEs(date, "d 'de' MMMM");

// "2026-10-16" → "16 oct"
export const formatShortDate = (dateKey) =>
  formatEs(parseISO(dateKey), "d MMM");

// "2026-09-12T..." → "septiembre de 2026"
export const formatMonthYear = (isoDate) =>
  formatEs(parseISO(isoDate), "MMMM 'de' yyyy");

// Horarios
// ("16:00", 45) → "16:00 a 16:45"
export const formatTimeRange = (time, duration) =>
  `${time} a ${toTime(toMinutes(time) + duration)}`;
