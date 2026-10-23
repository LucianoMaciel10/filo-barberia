import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import { ANY_BARBER_ID, barbers } from "../data/barbers";
import { business } from "../data/business";
import { getServiceById } from "../data/services";
import { getActiveAppointments } from "./appointments";

const BUSY_RATE = 30; // % de horarios ocupados (simulación de otros clientes)
const FULL_DAY_RATE = 10; // % de días completos por barbero (simulación)

// Hash determinístico (FNV-1a): mismo texto, mismo número
function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const toTime = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

// Dos intervalos se solapan si cada uno empieza antes de que termine el otro
const overlaps = (aStart, aEnd, bStart, bEnd) => aStart < bEnd && bStart < aEnd;

function isBarberSimulatedBusy(barberId, dateKey, time) {
  if (hash(`full|${barberId}|${dateKey}`) % 100 < FULL_DAY_RATE) return true;
  return hash(`${barberId}|${dateKey}|${time}`) % 100 < BUSY_RATE;
}

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

// TODO: reemplazar por una llamada a la API cuando esté el backend
export function getDaySlots(date, duration, barberId, now = new Date()) {
  const hours = business.schedule[date.getDay()];
  if (!hours) return [];

  const dateKey = format(date, "yyyy-MM-dd");
  const open = toMinutes(hours.open);
  const close = toMinutes(hours.close);
  const nowMinutes = isSameDay(date, now)
    ? now.getHours() * 60 + now.getMinutes()
    : -1;
  const booked = getBookedRanges(dateKey);

  const slots = [];
  for (let start = open; start + duration <= close; start += duration) {
    if (start <= nowMinutes) continue; // horarios que ya pasaron hoy

    const end = start + duration;
    const time = toTime(start);
    const overlapping = booked.filter((range) =>
      overlaps(start, end, range.start, range.end),
    );

    const isBusy = (id) =>
      isBarberSimulatedBusy(id, dateKey, time) ||
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

    slots.push({ time, taken });
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
