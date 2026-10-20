import { format, isBefore, isSameDay, startOfDay } from "date-fns";
import { ANY_BARBER_ID, barbers } from "../data/barbers";
import { business } from "../data/business";

const BUSY_RATE = 30; // % de horarios ocupados
const FULL_DAY_RATE = 10; // % de días completos por barbero

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

function isBarberBusy(barberId, dateKey, time) {
  if (hash(`full|${barberId}|${dateKey}`) % 100 < FULL_DAY_RATE) return true;
  return hash(`${barberId}|${dateKey}|${time}`) % 100 < BUSY_RATE;
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

  const slots = [];
  for (let start = open; start + duration <= close; start += duration) {
    if (start <= nowMinutes) continue; // horarios que ya pasaron hoy

    const time = toTime(start);
    const taken =
      barberId === ANY_BARBER_ID
        ? barbers.every((b) => isBarberBusy(b.id, dateKey, time))
        : isBarberBusy(barberId, dateKey, time);

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
