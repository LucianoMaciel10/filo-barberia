import {
  addMinutes,
  differenceInMinutes,
  format,
  getDay,
  isBefore,
  parseISO,
  subDays,
} from "date-fns";
import { getServiceById } from "../data/services";
import { getDemoAppointments } from "./demoAgenda";

const STORAGE_KEY = "filo-appointments";
const CANCEL_LIMIT_MINUTES = 120; // se puede cancelar hasta 2 horas antes
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

function writeAll(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // sin almacenamiento disponible: los turnos no se persisten
  }
}

const DEMO_CANCELLED_KEY = "filo-demo-cancelled";

function readDemoCancelled() {
  try {
    return JSON.parse(localStorage.getItem(DEMO_CANCELLED_KEY)) ?? [];
  } catch {
    return [];
  }
}

function writeDemoCancelled(ids) {
  try {
    localStorage.setItem(DEMO_CANCELLED_KEY, JSON.stringify(ids));
  } catch {
    // ignorar
  }
}

// Turnos de ejemplo para que el historial no arranque vacío
function seedHistory(email) {
  const flag = `filo-seeded:${email}`;
  try {
    if (localStorage.getItem(flag)) return;

    const workday = (daysAgo) => {
      let day = subDays(new Date(), daysAgo);
      if (getDay(day) === 0) day = subDays(day, 1); // domingos cerrado
      return format(day, "yyyy-MM-dd");
    };
    const suffix = Date.now().toString(36);

    writeAll([
      ...readAll(),
      {
        id: `apt_demo_${suffix}_1`,
        serviceId: "corte-barba",
        barberId: "nicolas-rios",
        date: workday(18),
        time: "16:00",
        userEmail: email,
        status: "confirmed",
      },
      {
        id: `apt_demo_${suffix}_2`,
        serviceId: "corte-clasico",
        barberId: "mateo-suarez",
        date: workday(25),
        time: "17:00",
        userEmail: email,
        status: "cancelled",
      },
    ]);
    localStorage.setItem(flag, "1");
  } catch {
    // ignorar
  }
}

export function getStart(appointment) {
  const [hours, minutes] = appointment.time.split(":").map(Number);
  const start = parseISO(appointment.date);
  start.setHours(hours, minutes, 0, 0);
  return start;
}

// "confirmed" + hora ya pasada = "completed"
export function getDisplayStatus(appointment, now = new Date()) {
  if (appointment.status === "cancelled") return "cancelled";

  const service = getServiceById(appointment.serviceId);
  const end = addMinutes(getStart(appointment), service.duration);
  return isBefore(end, now) ? "completed" : appointment.status;
}

export function canCancel(appointment, now = new Date()) {
  return (
    differenceInMinutes(getStart(appointment), now) >= CANCEL_LIMIT_MINUTES
  );
}

// Todos los turnos de un día (de ejemplo y reales), ordenados por hora
export function getDayAppointments(dateKey) {
  const cancelledDemo = new Set(readDemoCancelled());
  const demo = getDemoAppointments(dateKey).map((appointment) =>
    cancelledDemo.has(appointment.id)
      ? { ...appointment, status: "cancelled" }
      : appointment,
  );
  const real = readAll().filter((appointment) => appointment.date === dateKey);

  return [...demo, ...real]
    .map((appointment) => ({
      ...appointment,
      clientName: appointment.clientName ?? appointment.userEmail,
      displayStatus: getDisplayStatus(appointment),
    }))
    .sort((a, b) => a.time.localeCompare(b.time));
}

// Los que ocupan agenda: todos menos los cancelados
export function getActiveAppointments(dateKey) {
  return getDayAppointments(dateKey).filter(
    (appointment) => appointment.status !== "cancelled",
  );
}

// TODO: reemplazar las funciones de abajo por llamadas a la API
export function getAppointments(email) {
  seedHistory(email);
  return readAll()
    .filter((appointment) => appointment.userEmail === email)
    .map((appointment) => ({
      ...appointment,
      displayStatus: getDisplayStatus(appointment),
    }));
}

export async function createAppointment({ selection, user }) {
  await delay(800);

  const appointment = {
    id: `apt_${Date.now().toString(36)}`,
    ...selection, // serviceId, barberId, date, time
    userEmail: user.email,
    clientName: user.name,
    clientPhone: user.phone,
    status: "confirmed",
  };

  writeAll([...readAll(), appointment]);
  return appointment;
}

export async function cancelAppointment(id) {
  await delay(500);

  // Los turnos de ejemplo no están guardados: solo se recuerda que se cancelaron
  if (id.startsWith("demo_")) {
    writeDemoCancelled([...new Set([...readDemoCancelled(), id])]);
    return;
  }

  writeAll(
    readAll().map((appointment) =>
      appointment.id === id
        ? { ...appointment, status: "cancelled" }
        : appointment,
    ),
  );
}
