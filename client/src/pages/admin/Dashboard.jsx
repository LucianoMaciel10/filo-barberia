import { useMemo, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../../components/admin/StatCard";
import TodayAppointments from "../../components/admin/TodayAppointments";
import WeekChart from "../../components/admin/WeekChart";
import { business } from "../../data/business";
import { useAuth } from "../../hooks/useAuth";
import { getDashboardData } from "../../services/adminStats";
import {
  firstName,
  formatFullDate,
  formatLongDate,
  formatWeekRange,
  greeting,
  pluralize,
} from "../../utils/format";

const PREVIEW_COUNT = 5;

// Los umbrales son arbitrarios: ajustalos a lo que sea "mucho" o "poco" para la barbería
function getWeekHeadline(total, days = 6) {
  if (total === 0) return "Una semana sin reservas";
  const average = total / days;
  if (average < 4) return "Una semana tranquila";
  if (average < 8) return "Una semana con movimiento";
  return "Una semana a pleno";
}

function Dashboard() {
  const { user } = useAuth();
  const [now] = useState(() => new Date());
  const data = useMemo(() => getDashboardData(now), [now]);
  const { today, week, topService, isNextWeek } = data;

  const weekLabel = isNextWeek ? "Próxima semana" : "Esta semana";
  const weekInline = isNextWeek ? "la próxima semana" : "esta semana";
  const shopClosed = !business.schedule[now.getDay()];

  const confirmed = today.total - today.cancelled;
  const hasMore = today.total > PREVIEW_COUNT;

  const todaySubtitle = shopClosed
    ? "Hoy la barbería está cerrada."
    : hasMore
      ? `Primeros ${PREVIEW_COUNT} de ${today.total} turnos.`
      : `${pluralize(today.total, "turno", "turnos")} para hoy.`;

  return (
    <>
      <p className="text-xs text-charcoal/60">
        Filo Barbería / Resumen · {formatFullDate(now)}
      </p>

      <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:justify-between">
        <div>
          <h1 className="text-[32px] leading-tight md:text-[40px]">
            {greeting(now)}, {firstName(user.name)}.
          </h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Así viene el día en Filo. {formatLongDate(now)}.
          </p>
        </div>

        <Link
          to="/admin/agenda"
          className="inline-flex h-12 items-center gap-2 rounded-brand border border-borde bg-white px-5 text-sm font-semibold transition-colors hover:border-dorado"
        >
          <CalendarDays className="size-5" aria-hidden="true" />
          Ver agenda
        </Link>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Turnos hoy"
          value={today.total}
          detail={`${pluralize(confirmed, "confirmado", "confirmados")} · ${pluralize(today.cancelled, "cancelado", "cancelados")}`}
        />
        <StatCard
          label={weekLabel}
          value={week.total}
          detail={formatWeekRange(data.weekStart, data.weekEnd)}
        />
        <StatCard
          label="Cancelaciones"
          value={week.cancelled}
          detail={`${weekLabel} · ${week.cancelRate}% del total`}
        />
        <StatCard
          compact
          label="Servicio top"
          value={topService?.service.name ?? "—"}
          detail={
            topService
              ? `${pluralize(topService.count, "turno", "turnos")} ${weekInline}`
              : `Sin turnos ${weekInline}`
          }
        />
      </dl>

      <section
        aria-labelledby="week-title"
        className="mt-6 rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6"
      >
        <h2 id="week-title" className="text-2xl md:text-3xl">
          {getWeekHeadline(week.total)}
        </h2>
        <p className="mt-1 text-xs text-charcoal/60">
          Turnos por día · {pluralize(week.total, "reserva", "reservas")}{" "}
          {weekInline}
        </p>
        <WeekChart days={data.perDay} todayKey={data.todayKey} />
      </section>

      <section aria-labelledby="today-title" className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 id="today-title" className="text-3xl md:text-4xl">
              Los turnos de hoy
            </h2>
            <p className="mt-1 text-sm text-charcoal/60">{todaySubtitle}</p>
          </div>

          {hasMore && (
            <Link
              to="/admin/turnos"
              className="shrink-0 text-sm font-semibold text-dorado-oscuro hover:underline"
            >
              Ver todos
            </Link>
          )}
        </div>

        <div className="mt-4">
          <TodayAppointments
            appointments={today.appointments.slice(0, PREVIEW_COUNT)}
          />
        </div>
      </section>

      <p className="mt-10 text-xs text-charcoal/60">
        Datos ilustrativos · {business.name} · {business.city}
      </p>
    </>
  );
}

export default Dashboard;
