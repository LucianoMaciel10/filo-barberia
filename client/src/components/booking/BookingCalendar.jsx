import { useState } from "react";
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isSameDay,
  parseISO,
  startOfDay,
  startOfMonth,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getDayStatus } from "../../services/availability";
import { capitalize, formatLongDate } from "../../utils/format";

const MAX_MONTHS_AHEAD = 2;
const WEEKDAYS = ["L", "M", "M", "J", "V", "S", "D"];
const STATUS_LABEL = {
  past: "pasado",
  closed: "cerrado",
  full: "completo",
  over: "sin horarios disponibles hoy",
};

const navButton =
  "flex size-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-arena disabled:cursor-not-allowed disabled:text-charcoal/30 disabled:hover:bg-transparent";

function BookingCalendar({ selectedDate, duration, barberId, onSelect }) {
  const today = startOfDay(new Date());
  const minMonth = startOfMonth(today);
  const maxMonth = addMonths(minMonth, MAX_MONTHS_AHEAD);

  const [viewMonth, setViewMonth] = useState(() =>
    startOfMonth(selectedDate ? parseISO(selectedDate) : today),
  );

  const days = eachDayOfInterval({
    start: viewMonth,
    end: endOfMonth(viewMonth),
  });
  const leadingBlanks = (getDay(viewMonth) + 6) % 7; // la semana empieza en lunes
  const canGoPrev = isBefore(minMonth, viewMonth);
  const canGoNext = isBefore(viewMonth, maxMonth);

  return (
    <div className="rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setViewMonth(addMonths(viewMonth, -1))}
          disabled={!canGoPrev}
          aria-label="Mes anterior"
          className={navButton}
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>

        <h3 aria-live="polite" className="font-sans text-sm font-semibold">
          {capitalize(format(viewMonth, "MMMM 'de' yyyy", { locale: es }))}
        </h3>

        <button
          type="button"
          onClick={() => setViewMonth(addMonths(viewMonth, 1))}
          disabled={!canGoNext}
          aria-label="Mes siguiente"
          className={navButton}
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((weekday, index) => (
          <span
            key={index}
            aria-hidden="true"
            className="pb-2 text-xs text-charcoal/60"
          >
            {weekday}
          </span>
        ))}

        {Array.from({ length: leadingBlanks }, (_, index) => (
          <span key={`blank-${index}`} />
        ))}

        {days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const status = getDayStatus(day, duration, barberId);
          const disabled = status !== "available";
          const isSelected = dateKey === selectedDate;
          const isToday = isSameDay(day, today);

          const stateStyle = isSelected
            ? "bg-dorado font-semibold"
            : status === "full"
              ? "cursor-not-allowed text-charcoal/40 line-through"
              : disabled
                ? "cursor-not-allowed text-charcoal/30"
                : "hover:bg-arena";
          const todayStyle = isToday && !isSelected ? "bg-dorado-suave" : "";

          return (
            <button
              key={dateKey}
              type="button"
              disabled={disabled}
              aria-pressed={isSelected}
              aria-label={`${formatLongDate(day)}${disabled ? `, ${STATUS_LABEL[status]}` : ""}`}
              onClick={() => onSelect(dateKey)}
              className={`mx-auto flex h-10 w-full max-w-12 cursor-pointer items-center justify-center rounded-lg text-sm transition-colors ${stateStyle} ${todayStyle}`}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-charcoal/60">
        Hoy en beige · Pasados en gris · Tachado: completo · Domingos cerrado
      </p>
    </div>
  );
}

export default BookingCalendar;
