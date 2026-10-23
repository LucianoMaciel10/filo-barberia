import { parseISO } from "date-fns";
import { Link } from "react-router-dom";
import StatusBadge from "../ui/StatusBadge";
import { getBarberById, getBarberLabel } from "../../data/barbers";
import { business } from "../../data/business";
import { getServiceById } from "../../data/services";
import { canCancel } from "../../services/appointments";
import {
  formatFullDate,
  formatPrice,
  formatTimeRange,
} from "../../utils/format";

const UPCOMING = ["confirmed", "pending"];

function AppointmentCard({ appointment, onCancel }) {
  const service = getServiceById(appointment.serviceId);
  const barber = getBarberById(appointment.barberId);
  const isUpcoming = UPCOMING.includes(appointment.displayStatus);
  const address = `${business.address}, ${business.neighborhood}`;

  return (
    <article className="rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6">
      <div className="flex flex-col items-start gap-2 md:flex-row md:justify-between">
        <h3 className="text-2xl md:text-3xl">{service.name}</h3>
        <StatusBadge status={appointment.displayStatus} />
      </div>

      <p className="mt-4 text-sm">
        {formatFullDate(parseISO(appointment.date))}
      </p>
      <p className="mt-1 text-xs text-charcoal/60">
        {formatTimeRange(appointment.time, service.duration)} ·{" "}
        {getBarberLabel(barber)}
      </p>
      <p className="mt-2 text-sm font-semibold">
        {formatPrice(service.price)} ARS
      </p>

      <div className="mt-5 flex flex-col gap-3 border-t border-borde pt-5 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-charcoal/60">
          {!isUpcoming && `${address} · Gracias por elegir Filo.`}
          {isUpcoming &&
            (canCancel(appointment)
              ? `${address} · Podés cancelar hasta 2 horas antes.`
              : `${address} · Ya no se puede cancelar desde acá.`)}
        </p>

        {isUpcoming && canCancel(appointment) && (
          <button
            type="button"
            onClick={() => onCancel(appointment)}
            aria-label={`Cancelar turno de ${service.name}`}
            className="h-10 w-full cursor-pointer rounded-brand border border-borde bg-white px-5 text-sm font-semibold transition-colors hover:border-cancelado hover:text-cancelado md:w-auto"
          >
            Cancelar
          </button>
        )}

        {!isUpcoming && (
          <Link
            to={`/reservar/servicio?servicio=${service.id}`}
            className="flex h-10 w-full items-center justify-center rounded-brand border border-borde bg-white px-5 text-sm font-semibold transition-colors hover:border-dorado md:w-auto"
          >
            Volver a reservar
          </Link>
        )}
      </div>
    </article>
  );
}

export default AppointmentCard;
