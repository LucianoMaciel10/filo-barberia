import { addDays, differenceInCalendarDays, format, parseISO } from "date-fns";
import { getBarberById } from "../data/barbers";
import { getServiceById } from "../data/services";
import { getDayAppointments } from "./appointments";

const normalize = (text) =>
  text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

// TODO: reemplazar por una llamada a la API con filtros y paginación en el servidor
export function listAppointments({ from, to }) {
  const start = parseISO(from);
  const days = differenceInCalendarDays(parseISO(to), start);
  const result = [];

  for (let i = 0; i <= days; i++) {
    const key = format(addDays(start, i), "yyyy-MM-dd");
    result.push(...getDayAppointments(key));
  }

  return result.map((appointment) => ({
    ...appointment,
    service: getServiceById(appointment.serviceId),
    barber: getBarberById(appointment.barberId),
  }));
}

export function filterAppointments(list, { query, status, barberId }) {
  const q = normalize(query.trim());
  const digits = q.replace(/\D/g, "");

  return list.filter((appointment) => {
    if (status !== "all" && appointment.displayStatus !== status) return false;
    if (barberId !== "all" && appointment.barberId !== barberId) return false;
    if (!q) return true;

    const text = normalize(
      `${appointment.clientName} ${appointment.userEmail ?? ""}`,
    );
    if (text.includes(q)) return true;

    // El teléfono se compara solo con dígitos, y desde 3 para no coincidir con todo
    return (
      digits.length >= 3 &&
      (appointment.clientPhone ?? "").replace(/\D/g, "").includes(digits)
    );
  });
}
