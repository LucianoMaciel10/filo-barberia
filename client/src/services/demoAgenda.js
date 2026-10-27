import { parseISO } from "date-fns";
import { barbers } from "../data/barbers";
import { business } from "../data/business";
import { services } from "../data/services";
import { toMinutes, toTime } from "../utils/time";

const FILL_RATE = 25; // % de probabilidad de que haya un turno en cada hueco
const CANCEL_RATE = 8; // % de turnos cancelados
const DAY_OFF_RATE = 10; // % de días libres por barbero
const GAP = 60; // minutos que se salta cuando no hay turno

const CLIENTS = [
  "Ana Pérez",
  "Bruno Díaz",
  "Julián Castro",
  "Sofía López",
  "Diego Fernández",
  "Marina Gómez",
  "Lucas Romero",
  "Camila Herrera",
  "Martín Acosta",
  "Valeria Núñez",
  "Tomás Ibarra",
  "Paula Medina",
];

// Hash determinístico (FNV-1a): mismo texto, mismo número
function hash(text) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function isBarberOff(barberId, dateKey) {
  return hash(`off|${barberId}|${dateKey}`) % 100 < DAY_OFF_RATE;
}

const toEmail = (name) =>
  `${name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, ".")}@gmail.com`;

function toPhone(seed) {
  const n = hash(`phone|${seed}`);
  return `+54 9 11 ${2000 + (n % 8000)}-${1000 + ((n >>> 8) % 9000)}`;
}

// TODO: desaparece cuando haya backend: los turnos vienen de la base de datos
export function getDemoAppointments(dateKey) {
  const hours = business.schedule[parseISO(dateKey).getDay()];
  if (!hours) return [];

  const close = toMinutes(hours.close);
  const result = [];

  for (const barber of barbers) {
    if (isBarberOff(barber.id, dateKey)) continue;

    let cursor = toMinutes(hours.open);
    while (cursor < close) {
      const seed = `${barber.id}|${dateKey}|${cursor}`;

      if (hash(`fill|${seed}`) % 100 >= FILL_RATE) {
        cursor += GAP;
        continue;
      }

      const service = services[hash(`service|${seed}`) % services.length];
      if (cursor + service.duration > close) break;

      const clientName = CLIENTS[hash(`client|${seed}`) % CLIENTS.length];

      result.push({
        id: `demo_${barber.id}_${dateKey}_${cursor}`,
        serviceId: service.id,
        barberId: barber.id,
        date: dateKey,
        time: toTime(cursor),
        clientName,
        userEmail: toEmail(clientName),
        clientPhone: toPhone(seed),
        status:
          hash(`cancel|${seed}`) % 100 < CANCEL_RATE
            ? "cancelled"
            : "confirmed",
      });
      cursor += service.duration;
    }
  }
  return result;
}
