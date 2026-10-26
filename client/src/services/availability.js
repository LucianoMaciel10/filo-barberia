import { addDays, format, isBefore, isSameDay, startOfDay } from "date-fns";
import { ANY_BARBER_ID, barbers } from "../data/barbers";
import { business } from "../data/business";
import { getServiceById } from "../data/services";
import { toMinutes, toTime } from "../utils/time";
import { getActiveAppointments } from "./appointments";
import { isBarberOff } from "./demoAgenda";

// Anticipación mínima para reservar. Con 0, se puede reservar hasta que el turno empieza.
// Con 60, no se pueden reservar turnos que empiezan en la próxima hora.
const MIN_NOTICE_MINUTES = 0;

// Dos intervalos se solapan si cada uno empieza antes de que termine el otro
const overlaps = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd;

function getBookedRanges(dateKey) {
  return getActiveAppointments(dateKey).map((appointment) => {
    const start = toMinutes(appointment.time);
    return {
      barberId: appointment.barberId,
      start,
      end: start + getServiceById(appointment.serviceId).duration,
    };
  });
}

// Hora en la que empieza el último turno del día ("19:30"), o null si cierra
export function getLastSlotStart(date, duration) {
  const hours = business.schedule[date.getDay()];
  if (!hours) return null;

  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const count = Math.floor((close - open) / duration);
  return count > 0 ? toTime(open + (count - 1) * duration) : null;
}

// TODO: reemplazar por una llamada a la API cuando esté el backend
export function getDaySlots(date, duration, barberId, now = new Date()) {
  const hours = business.schedule[date.getDay()];
  if (!hours) return [];

  const dateKey = format(date, "yyyy-MM-dd");
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const earliestStart = isSameDay(date, now)
    ? now.getHours() * 60 + now.getMinutes() + MIN_NOTICE_MINUTES
    : -1;
  const booked = getBookedRanges(dateKey);

  const slots = [];
  for (let start = open; start + duration <= close; start += duration) {
    if (start <= earliestStart) continue; // horarios que ya pasaron hoy

    const end = start + duration;
    const overlapping = booked.filter((range) =>
      overlaps(start, end, range.start, range.end),
    );

    const isBusy = (id) =>
      isBarberOff(id, dateKey) ||
      overlapping.some((range) => range.barberId === id);

    let taken;
    if (barberId === ANY_BARBER_ID) {
      // Los turnos "cualquiera" todavía no tienen barbero asignado:
      // cada uno ocupa uno de los barberos libres
      const unassigned = overlapping.filter(
        (range) => range.barberId === ANY_BARBER_ID,
      ).length;
      const free = barbers.filter((barber) => !isBusy(barber.id)).length;
      taken = free - unassigned <= 0;
    } else {
      taken = isBusy(barberId);
    }

    slots.push({ time: toTime(start), taken });
  }
  return slots;
}

export function getDayStatus(date, duration, barberId, now = new Date()) {
  if (isBefore(date, startOfDay(now))) return "past";
  if (!business.schedule[date.getDay()]) return "closed";

  const slots = getDaySlots(date, duration, barberId, now);
  if (slots.length === 0) return "over"; // hoy ya no quedan horarios
  return slots.some((slot) => !slot.taken) ? "available" : "full";
}

// Día que se propone al entrar al paso: hoy si se puede abrir, o el primero que siga
export function getDefaultDate(duration, barberId, now = new Date()) {
  const today = startOfDay(now);

  for (let i = 0; i < 60; i++) {
    const day = addDays(today, i);
    const status = getDayStatus(day, duration, barberId, now);

    // "over" (hoy sin horarios) cuenta: se puede abrir para ver la explicación
    if (status === "available" || status === "over") {
      return format(day, "yyyy-MM-dd");
    }
  }
  return null;
}
