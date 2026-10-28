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

const weekdayName = (date, pattern) => capitalize(formatEs(date, pattern));

// Date → "Lun" / "Lunes"
export const weekdayShort = (date) => weekdayName(date, "EEE");
export const weekdayLong = (date) => weekdayName(date, "EEEE");

// (12 oct, 17 oct) → "Del 12 al 17 de octubre"
export function formatWeekRange(start, end) {
  const sameMonth = start.getMonth() === end.getMonth();
  return `Del ${sameMonth ? format(start, "d") : formatDayMonth(start)} al ${formatDayMonth(end)}`;
}

// (3, "turno", "turnos") → "3 turnos"
export const pluralize = (count, one, many) =>
  `${count} ${count === 1 ? one : many}`;

export function greeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Buen día";
  if (hour < 20) return "Buenas tardes";
  return "Buenas noches";
}

// (12 oct, 17 oct) → "12–17 de octubre, 2026"
export function formatWeekTitle(start, end) {
  const year = end.getFullYear();
  if (start.getMonth() === end.getMonth()) {
    return `${start.getDate()}–${formatEs(end, "d 'de' MMMM")}, ${year}`;
  }
  return `${formatDayMonth(start)} – ${formatDayMonth(end)}, ${year}`;
}

// "2026-10-16" → "16 oct 2026"
export const formatDateWithYear = (dateKey) =>
  formatEs(parseISO(dateKey), "d MMM yyyy");
