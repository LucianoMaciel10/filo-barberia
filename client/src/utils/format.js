import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export function formatPrice(amount) {
  return `$ ${new Intl.NumberFormat("es-AR").format(amount)}`;
}

export function shortName(fullName) {
  const [first, ...rest] = fullName.trim().split(/\s+/);
  const lastInitial = rest.length ? ` ${rest[rest.length - 1][0]}.` : "";
  return `${first}${lastInitial}`;
}

export const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1);

// Date → "Viernes 16 de octubre"
export const formatLongDate = (date) =>
  capitalize(format(date, "EEEE d 'de' MMMM", { locale: es }));

// "2026-10-16" → "16 oct"
export const formatShortDate = (dateKey) =>
  format(parseISO(dateKey), "d MMM", { locale: es });

// Date → "Viernes 16 de octubre de 2026"
export const formatFullDate = (date) =>
  capitalize(format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es }));

// ("16:00", 45) → "16:00 a 16:45"
export function formatTimeRange(time, duration) {
  const [hours, minutes] = time.split(":").map(Number);
  const end = hours * 60 + minutes + duration;
  const pad = (n) => String(n).padStart(2, "0");
  return `${time} a ${pad(Math.floor(end / 60))}:${pad(end % 60)}`;
}

export const firstName = (fullName) => fullName.trim().split(/\s+/)[0];

// Date → "16 de octubre"
export const formatDayMonth = (date) =>
  format(date, "d 'de' MMMM", { locale: es });

// "Tomás Molina" → "TM"
export const initials = (fullName) =>
  fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

// "2026-09-12T..." → "septiembre de 2026"
export const formatMonthYear = (isoDate) =>
  format(parseISO(isoDate), "MMMM 'de' yyyy", { locale: es });
