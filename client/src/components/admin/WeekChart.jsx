import { pluralize, weekdayLong, weekdayShort } from "../../utils/format";

const BAR_AREA = 112; // px, igual a h-28

function WeekChart({ days, todayKey }) {
  const max = Math.max(...days.map((day) => day.total), 1);

  return (
    <ul className="mt-6 flex gap-3 md:gap-4">
      {days.map((day) => {
        const isToday = day.key === todayKey;
        const height = Math.max(Math.round((day.total / max) * BAR_AREA), 8);

        return (
          <li key={day.key} className="flex-1">
            <span className="sr-only">
              {weekdayLong(day.date)}: {pluralize(day.total, "turno", "turnos")}
              {isToday && ", hoy"}
            </span>

            <div aria-hidden="true" className="flex h-28 items-end">
              <div
                className={`w-full rounded-lg ${isToday ? "bg-dorado" : "bg-dorado-suave"}`}
                style={{ height }}
              />
            </div>

            <p aria-hidden="true" className="mt-3 text-center">
              <span className="block text-xs font-semibold">{day.total}</span>
              <span className="block text-xs text-charcoal/60">
                {weekdayShort(day.date)}
              </span>
            </p>
          </li>
        );
      })}
    </ul>
  );
}

export default WeekChart;
