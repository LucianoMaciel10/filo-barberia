import { formatLongDate, weekdayShort } from "../../utils/format";
import { toMinutes } from "../../utils/time";
import AgendaBlock from "./AgendaBlock";

const pad = (hour) => `${String(hour).padStart(2, "0")}:00`;

function getRows(day) {
  if (!day.hours) return [];

  const first = Math.floor(toMinutes(day.hours.open) / 60);
  const last = Math.ceil(toMinutes(day.hours.close) / 60);

  return Array.from({ length: last - first }, (_, index) => {
    const hour = first + index;
    const from = hour * 60;
    const to = from + 60;

    return {
      hour,
      starting: day.items.filter(
        (item) => item.start >= from && item.start < to,
      ),
      // "Disponible" si ningún turno activo ocupa esa hora
      free: !day.items.some(
        (item) =>
          item.status !== "cancelled" && item.start < to && item.end > from,
      ),
    };
  });
}

function DayAgenda({ days, activeKey, onChangeDay, onSelect }) {
  const day = days.find((d) => d.key === activeKey);
  const rows = getRows(day);

  return (
    <div className="mt-6 lg:hidden">
      <ul aria-label="Días de la semana" className="grid grid-cols-6 gap-2">
        {days.map((item) => {
          const active = item.key === activeKey;
          return (
            <li key={item.key}>
              <button
                type="button"
                aria-pressed={active}
                aria-label={formatLongDate(item.date)}
                onClick={() => onChangeDay(item.key)}
                className={`h-10 w-full cursor-pointer rounded-lg border px-1 text-sm transition-colors ${
                  active
                    ? "border-dorado bg-dorado font-semibold"
                    : "border-borde bg-white hover:border-dorado"
                }`}
              >
                {weekdayShort(item.date).charAt(0)} {item.date.getDate()}
              </button>
            </li>
          );
        })}
      </ul>

      <section className="mt-4 rounded-brand border border-borde bg-white p-5 shadow-sm">
        <h3 className="text-2xl">{formatLongDate(day.date)}</h3>

        {rows.length === 0 ? (
          <p className="mt-4 text-sm text-charcoal/60">
            La barbería está cerrada.
          </p>
        ) : (
          <ol className="mt-4 divide-y divide-borde">
            {rows.map((row) => (
              <li key={row.hour} className="flex gap-4 py-3">
                <span className="w-12 shrink-0 pt-1 text-xs text-charcoal/60">
                  {pad(row.hour)}
                </span>
                <div className="min-w-0 flex-1 space-y-2">
                  {row.starting.map((item) => (
                    <AgendaBlock
                      key={item.id}
                      item={item}
                      onSelect={onSelect}
                      className="w-full"
                    />
                  ))}
                  {row.free && (
                    <p className="py-1 text-xs text-charcoal/50">Disponible</p>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

export default DayAgenda;
