import { addDays, format, startOfWeek } from "date-fns";
import { getServiceById } from "../data/services";
import { getDayAppointments } from "./appointments";

const toKey = (date) => format(date, "yyyy-MM-dd");

export function getDashboardData(now = new Date()) {
  // Los domingos la barbería está cerrada: mostramos la semana que empieza mañana
  const isNextWeek = now.getDay() === 0;
  const reference = isNextWeek ? addDays(now, 1) : now;
  const weekStart = startOfWeek(reference, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 6 }, (_, i) => addDays(weekStart, i)); // lunes a sábado

  const perDay = weekDays.map((date) => {
    const appointments = getDayAppointments(toKey(date));
    return { date, key: toKey(date), total: appointments.length, appointments };
  });

  const all = perDay.flatMap((day) => day.appointments);
  const cancelled = all.filter((a) => a.status === "cancelled").length;

  const counts = new Map();
  for (const appointment of all) {
    if (appointment.status === "cancelled") continue;
    counts.set(
      appointment.serviceId,
      (counts.get(appointment.serviceId) ?? 0) + 1,
    );
  }
  const [topId, topCount] =
    [...counts.entries()].sort((a, b) => b[1] - a[1])[0] ?? [];

  const today = getDayAppointments(toKey(now));

  return {
    weekStart,
    weekEnd: weekDays.at(-1),
    isNextWeek,
    perDay,
    todayKey: toKey(now),
    week: {
      total: all.length,
      cancelled,
      cancelRate: all.length ? Math.round((cancelled / all.length) * 100) : 0,
    },
    topService: topId
      ? { service: getServiceById(topId), count: topCount }
      : null,
    today: {
      appointments: today,
      total: today.length,
      cancelled: today.filter((a) => a.status === "cancelled").length,
    },
  };
}
