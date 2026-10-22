import { useEffect, useRef } from "react";
import { parseISO } from "date-fns";
import { CalendarPlus, Check, Info } from "lucide-react";
import { Link, Navigate, useLocation } from "react-router-dom";
import DetailList from "../../components/booking/DetailList";
import StatusBadge from "../../components/ui/StatusBadge";
import {
  ANY_BARBER_ID,
  getBarberById,
  getBarberLabel,
} from "../../data/barbers";
import { business } from "../../data/business";
import { getServiceById } from "../../data/services";
import { useAuth } from "../../hooks/useAuth";
import { downloadIcs } from "../../utils/calendar";
import {
  firstName,
  formatFullDate,
  formatPrice,
  formatTimeRange,
} from "../../utils/format";

function BookingSuccess() {
  const { state } = useLocation();
  const { user } = useAuth();
  const headingRef = useRef(null);
  const appointment = state?.appointment;

  // Al llegar, el foco va al título para que el lector de pantalla lo anuncie
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  // Si entra directo a la URL, no hay turno que mostrar
  if (!appointment) return <Navigate to="/reservar" replace />;

  const service = getServiceById(appointment.serviceId);
  const barber = getBarberById(appointment.barberId);
  const address = `${business.address}, ${business.neighborhood}`;

  const welcome =
    barber.id === ANY_BARBER_ID
      ? "Te esperamos en Filo."
      : `${firstName(barber.name)} te espera en Filo.`;

  const rows = [
    ["Fecha", formatFullDate(parseISO(appointment.date))],
    ["Hora", formatTimeRange(appointment.time, service.duration)],
    ["Barbero", getBarberLabel(barber)],
    ["Dónde", address],
  ];

  const handleAddToCalendar = () =>
    downloadIcs({
      id: appointment.id,
      title: `${service.name} en ${business.name}`,
      description: `Turno con ${getBarberLabel(barber)}. Pagás en la barbería.`,
      location: `${address}, ${business.city}`,
      date: appointment.date,
      time: appointment.time,
      duration: service.duration,
    });

  return (
    <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-12 text-center md:py-16">
      <span
        aria-hidden="true"
        className="flex size-17 items-center justify-center rounded-xl border-2 bg-confirmado-suave text-confirmado"
      >
        <Check className="size-12" strokeWidth={1.5} />
      </span>

      <h1
        ref={headingRef}
        tabIndex={-1}
        className="mt-8 text-[32px] leading-tight outline-none md:text-5xl"
      >
        Listo, {firstName(user.name)}.
        <span className="block">Tu turno está confirmado.</span>
      </h1>

      <p className="mt-5 text-sm text-charcoal/60">
        Te mandamos los detalles a {appointment.userEmail}. {welcome}
      </p>

      <article className="mt-8 w-full rounded-brand border border-borde bg-white p-5 text-left shadow-sm md:p-6">
        <div className="flex items-start gap-2 min-[360px]:justify-between max-[360px]:flex-col">
          <h2 className="text-2xl md:text-3xl">{service.name}</h2>
          <StatusBadge status={appointment.status} />
        </div>

        <DetailList rows={rows} className="mt-5" />
        <DetailList
          rows={[["Pagás en Filo", `${formatPrice(service.price)} ARS`]]}
          className="mt-5 border-t border-borde pt-5"
        />
      </article>

      <div className="mt-4 grid w-full gap-3 sm:grid-cols-2">
        <Link
          to="/mis-turnos"
          className="flex h-12 items-center justify-center rounded-brand bg-dorado text-sm font-semibold transition-colors hover:bg-dorado/90"
        >
          Ver mis turnos
        </Link>
        <button
          type="button"
          onClick={handleAddToCalendar}
          className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-brand border border-borde bg-white text-sm font-semibold transition-colors hover:border-dorado"
        >
          <CalendarPlus className="size-5" aria-hidden="true" />
          Agregar al calendario
        </button>
      </div>

      <div className="mt-4 flex w-full items-start gap-3 rounded-brand bg-dorado-suave p-4 text-left text-dorado-oscuro">
        <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="text-xs font-semibold">Un ratito antes, mejor</p>
          <p className="mt-0.5 text-xs">
            Vení 5 minutos antes. Si no podés venir, cancelá hasta 2 horas antes
            desde Mis turnos.
          </p>
        </div>
      </div>
    </section>
  );
}

export default BookingSuccess;
