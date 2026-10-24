import { useState } from "react";
import { parseISO } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import BookingSummary from "../../components/booking/BookingSummary";
import StepActions from "../../components/booking/StepActions";
import FormAlert from "../../components/ui/FormAlert";
import { getBarberLabel } from "../../data/barbers";
import { business } from "../../data/business";
import { useAuth } from "../../hooks/useAuth";
import { useBooking } from "../../hooks/useBooking";
import { createAppointment } from "../../services/appointments";
import {
  formatFullDate,
  formatPrice,
  formatTimeRange,
} from "../../utils/format";
import DetailList from "../../components/ui/DetailList";
import { clearBookingDraft } from "../../services/bookingDraft";

function SummaryStep() {
  const { selection, service, barber } = useBooking();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const rows = [
    ["Servicio", service.name],
    ["Barbero", getBarberLabel(barber)],
    ["Fecha", formatFullDate(parseISO(selection.date))],
    ["Horario", formatTimeRange(selection.time, service.duration)],
    ["Dirección", `${business.address}, ${business.neighborhood}`],
  ];

  const contact = [user.name, user.phone, user.email]
    .filter(Boolean)
    .join(" · ");

  const handleConfirm = async () => {
    setSubmitting(true);
    setError(false);

    try {
      const appointment = await createAppointment({ selection, user });
      clearBookingDraft();
      navigate("/turno-confirmado", { state: { appointment }, replace: true });
    } catch {
      setError(true);
      setSubmitting(false);
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
      <div className="space-y-6">
        <section className="rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6">
          <h2 className="text-2xl md:text-3xl">Tu turno en Filo</h2>

          <DetailList rows={rows} className="mt-6" />
          <DetailList
            rows={[["Total · ARS", formatPrice(service.price)]]}
            valueClassName="font-semibold"
            className="mt-5 border-t border-borde pt-5"
          />
        </section>

        <section className="rounded-brand border border-borde bg-white p-5 shadow-sm md:p-6">
          <h2 className="font-sans text-sm font-semibold">Datos de contacto</h2>
          <p className="mt-3 text-sm text-charcoal/70">{contact}</p>
          <Link
            to="/perfil"
            state={{ returnTo: "/reservar/resumen" }}
            className="mt-3 inline-block text-xs text-dorado-oscuro hover:underline"
          >
            Editar mis datos
          </Link>
        </section>
      </div>

      <BookingSummary>
        <FormAlert
          show={error}
          title="No pudimos confirmar tu turno"
          message="Revisá tu conexión y volvé a intentar."
        />
        <StepActions
          canContinue={!submitting}
          onContinue={handleConfirm}
          continueLabel={submitting ? "Confirmando..." : "Confirmar turno"}
          backTo="/reservar/fecha"
          note="Al confirmar aceptás nuestra política: podés cancelar sin cargo hasta 2 horas antes."
        />
      </BookingSummary>
    </div>
  );
}

export default SummaryStep;
