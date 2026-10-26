import { isSameDay, parseISO } from "date-fns";
import { Info } from "lucide-react";
import { ANY_BARBER_ID } from "../../data/barbers";
import { business } from "../../data/business";
import { getDaySlots, getLastSlotStart } from "../../services/availability";
import { formatLongDate } from "../../utils/format";

const cardClass =
  "rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6";

function TimeSlotPicker({ date, service, barber, selectedTime, onSelect }) {
  if (!date) {
    return (
      <div className={cardClass}>
        <h3 className="text-2xl">Elegí un día</h3>
        <p className="mt-2 text-sm text-charcoal/60">
          Seleccioná una fecha en el calendario para ver los horarios.
        </p>
      </div>
    );
  }

  const parsedDate = parseISO(date);
  const isToday = isSameDay(parsedDate, new Date());
  const slots = getDaySlots(parsedDate, service.duration, barber.id);
  const barberText =
    barber.id === ANY_BARBER_ID ? "el primer barbero disponible" : barber.name;

  const closeTime = business.schedule[parsedDate.getDay()]?.close;
  const lastStart = getLastSlotStart(parsedDate, service.duration);

  return (
    <fieldset className={cardClass}>
      <legend className="sr-only">Elegí tu horario</legend>

      <h3 className="text-2xl">{formatLongDate(parsedDate)}</h3>
      <p className="mt-2 text-xs text-charcoal/60">
        Horarios con {barberText} · Duración: {service.duration} min
      </p>

      {slots.length === 0 ? (
        <div
          role="status"
          className="mt-4 flex items-start gap-3 rounded-lg bg-dorado-suave p-4 text-dorado-oscuro"
        >
          <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold">
              {isToday
                ? "Ya no quedan horarios para hoy"
                : "No hay horarios disponibles este día"}
            </p>
            <p className="mt-1 text-xs">
              {isToday && closeTime && lastStart
                ? `Hoy se atiende hasta las ${closeTime} y el último turno de ${service.duration} min empezaba a las ${lastStart}. `
                : ""}
              Elegí otro día para reservar.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-4 flex flex-wrap gap-2">
            {slots.map(({ time, taken }) => (
              <label
                key={time}
                className="flex h-10 min-w-20 cursor-pointer items-center justify-center rounded-lg border border-borde bg-white px-3 text-sm transition-colors has-enabled:hover:border-dorado has-checked:border-charcoal has-checked:bg-charcoal has-checked:text-fondo has-disabled:cursor-not-allowed has-disabled:border-transparent has-disabled:bg-arena has-disabled:text-charcoal/40 has-disabled:line-through has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-dorado"
              >
                <input
                  type="radio"
                  name="time"
                  value={time}
                  disabled={taken}
                  checked={selectedTime === time}
                  onChange={() => onSelect(time)}
                  className="sr-only"
                />
                {time}
              </label>
            ))}
          </div>

          <p className="mt-4 text-xs text-charcoal/60">
            Tachado: ocupado · Oscuro: elegido · Horario de Buenos Aires
            {isToday && " · Los horarios que ya pasaron no se muestran"}
          </p>
        </>
      )}
    </fieldset>
  );
}

export default TimeSlotPicker;
