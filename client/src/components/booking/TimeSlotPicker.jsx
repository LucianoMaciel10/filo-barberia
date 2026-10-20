import { parseISO } from "date-fns";
import { ANY_BARBER_ID } from "../../data/barbers";
import { getDaySlots } from "../../services/availability";
import { formatLongDate } from "../../utils/format";

function TimeSlotPicker({ date, service, barber, selectedTime, onSelect }) {
  if (!date) {
    return (
      <div className="rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6">
        <h3 className="text-2xl">Elegí un día</h3>
        <p className="mt-2 text-sm text-charcoal/60">
          Seleccioná una fecha en el calendario para ver los horarios.
        </p>
      </div>
    );
  }

  const parsedDate = parseISO(date);
  const slots = getDaySlots(parsedDate, service.duration, barber.id);
  const barberText =
    barber.id === ANY_BARBER_ID ? "el primer barbero disponible" : barber.name;

  return (
    <fieldset className="rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6">
      <legend className="sr-only">Elegí tu horario</legend>

      <h3 className="text-2xl">{formatLongDate(parsedDate)}</h3>
      <p className="mt-2 text-xs text-charcoal/60">
        Horarios con {barberText} · Duración: {service.duration} min
      </p>

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
      </p>
    </fieldset>
  );
}

export default TimeSlotPicker;
