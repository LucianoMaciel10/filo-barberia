import { getBarberLabel } from "../../data/barbers";
import { useBooking } from "../../hooks/useBooking";
import { formatPrice } from "../../utils/format";
import { formatShortDate } from "../../utils/format";

function BookingSummary({ children }) {
  const { service, barber, selection } = useBooking();

  return (
    <aside aria-label="Resumen de tu reserva" className="lg:sticky lg:top-28">
      <div className="rounded-brand border border-borde bg-white p-6 shadow-sm">
        <h2 className="text-2xl">Tu reserva</h2>

        {service ? (
          <>
            <p className="mt-3 text-sm">
              {service.name} · {service.duration} min
            </p>
            {barber && (
              <p className="mt-1 text-sm text-charcoal/70">
                {getBarberLabel(barber)}
              </p>
            )}
            {selection.date && selection.time && (
              <p className="mt-1 text-sm text-charcoal/70">
                {formatShortDate(selection.date)} · {selection.time}
              </p>
            )}
            <p className="mt-2 text-sm font-semibold">
              Total · {formatPrice(service.price)} ARS
            </p>
          </>
        ) : (
          <p className="mt-3 text-sm text-charcoal/60">
            Elegí un servicio para ver el resumen.
          </p>
        )}

        <p className="mt-3 text-xs text-charcoal/60">
          Pagás en la barbería. Sin pago anticipado.
        </p>
      </div>

      {children}
    </aside>
  );
}

export default BookingSummary;
