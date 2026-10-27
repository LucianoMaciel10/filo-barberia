import { addDays, format } from "date-fns";
import { business } from "../data/business";
import { getServiceById } from "../data/services";
import { toMinutes } from "../utils/time";
import { getDayAppointments } from "./appointments";

// Rango que cubre la grilla: de la apertura más temprana al cierre más tardío
const schedules = Object.values(business.schedule).filter(Boolean);
export const AGENDA_START = Math.min(
  ...schedules.map((h) => toMinutes(h.open)),
);
export const AGENDA_END = Math.max(...schedules.map((h) => toMinutes(h.close)));

// Reparte en carriles los turnos que se pisan (por ejemplo, uno cancelado y otro nuevo)
function assignLanes(items) {
  const laneEnds = [];
  const placed = items.map((item) => {
    let lane = laneEnds.findIndex((end) => end <= item.start);
    if (lane === -1) lane = laneEnds.length;
    laneEnds[lane] = item.end;
    return { ...item, lane };
  });
  return { items: placed, lanes: Math.max(laneEnds.length, 1) };
}

// TODO: reemplazar por una llamada a la API cuando esté el backend
export function getWeekAgenda(weekStart, barberId) {
  return Array.from({ length: 6 }, (_, index) => {
    const date = addDays(weekStart, index); // lunes a sábado
    const key = format(date, "yyyy-MM-dd");

    const appointments = getDayAppointments(key)
      .filter((appointment) => appointment.barberId === barberId)
      .map((appointment) => {
        const service = getServiceById(appointment.serviceId);
        const start = toMinutes(appointment.time);
        return {
          ...appointment,
          service,
          start,
          end: start + service.duration,
        };
      });

    const { items, lanes } = assignLanes(appointments);
    return { date, key, hours: business.schedule[date.getDay()], items, lanes };
  });
}
