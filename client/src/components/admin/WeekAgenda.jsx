import { AGENDA_END, AGENDA_START } from "../../services/agenda";
import { formatLongDate, weekdayShort } from "../../utils/format";
import { toMinutes } from "../../utils/time";
import AgendaBlock from "./AgendaBlock";

const HOUR_HEIGHT = 80; // px por hora: un turno de 30 min entra con dos líneas
const GRID_COLS = "grid-cols-[3.5rem_repeat(6,minmax(0,1fr))]";
const HOURS = Array.from(
  { length: (AGENDA_END - AGENDA_START) / 60 },
  (_, index) => AGENDA_START / 60 + index,
);
const BODY_HEIGHT = HOURS.length * HOUR_HEIGHT;

const toPixels = (minutes) => ((minutes - AGENDA_START) / 60) * HOUR_HEIGHT;

function WeekAgenda({ days, todayKey, onSelect }) {
  return (
    <div className="hidden overflow-hidden rounded-brand border border-borde bg-white shadow-sm lg:block">
      <div aria-hidden="true" className={`grid ${GRID_COLS} bg-arena text-sm`}>
        <div />
        {days.map((day) => (
          <div
            key={day.key}
            className={`px-2 py-4 text-center font-semibold ${
              day.key === todayKey ? "bg-dorado-suave" : ""
            }`}
          >
            {weekdayShort(day.date)} {day.date.getDate()}
          </div>
        ))}
      </div>

      <div className="relative" style={{ height: BODY_HEIGHT }}>
        {/* Líneas y etiquetas de cada hora */}
        <div aria-hidden="true" className="absolute inset-0">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="border-t border-borde pl-2 pt-1 text-xs text-charcoal/60 first:border-t-0"
              style={{ height: HOUR_HEIGHT }}
            >
              {String(hour).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        <div className={`relative grid h-full ${GRID_COLS}`}>
          <div />

          {days.map((day) => {
            const closedFrom = day.hours
              ? toPixels(toMinutes(day.hours.close))
              : 0;
            const width = 100 / day.lanes;

            return (
              <ol
                key={day.key}
                aria-label={formatLongDate(day.date)}
                className="relative border-l border-borde"
              >
                {closedFrom < BODY_HEIGHT && (
                  <li
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 bg-arena/70"
                    style={{ top: closedFrom }}
                  />
                )}

                {day.items.length === 0 && (
                  <li className="sr-only">Sin turnos</li>
                )}

                {day.items.map((item) => (
                  <li key={item.id}>
                    <AgendaBlock
                      item={item}
                      onSelect={onSelect}
                      className="absolute"
                      style={{
                        top: toPixels(item.start) + 1,
                        height: (item.service.duration / 60) * HOUR_HEIGHT - 2,
                        left: `calc(${item.lane * width}% + 2px)`,
                        width: `calc(${width}% - 4px)`,
                      }}
                    />
                  </li>
                ))}
              </ol>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default WeekAgenda;
