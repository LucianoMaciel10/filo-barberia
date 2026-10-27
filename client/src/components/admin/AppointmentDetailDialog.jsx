import { parseISO } from "date-fns";
import DetailList from "../ui/DetailList";
import Modal from "../ui/Modal";
import StatusBadge from "../ui/StatusBadge";
import { getAdminBarberLabel, getBarberById } from "../../data/barbers";
import { getServiceById } from "../../data/services";
import {
  formatFullDate,
  formatPrice,
  formatTimeRange,
} from "../../utils/format";

function AppointmentDetailDialog({ appointment, onClose, onCancel }) {
  const service = appointment && getServiceById(appointment.serviceId);
  const barber = appointment && getBarberById(appointment.barberId);
  const contact = appointment
    ? [appointment.clientPhone, appointment.userEmail]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <Modal
      open={!!appointment}
      onClose={onClose}
      title="Detalle del turno"
      description={
        appointment &&
        `${appointment.clientName} · ${formatFullDate(parseISO(appointment.date))}`
      }
    >
      {appointment && (
        <>
          <div className="mt-4">
            <StatusBadge status={appointment.displayStatus} />
          </div>

          <DetailList
            className="mt-5"
            rows={[
              ["Servicio", `${service.name} · ${service.duration} min`],
              ["Horario", formatTimeRange(appointment.time, service.duration)],
              ["Barbero", getAdminBarberLabel(barber)],
              ["Importe", `${formatPrice(service.price)} ARS`],
            ]}
          />

          {contact && (
            <p className="mt-5 text-xs text-charcoal/60">{contact}</p>
          )}

          {appointment.displayStatus === "confirmed" && (
            <button
              type="button"
              onClick={() => onCancel(appointment)}
              className="mt-6 h-12 w-full cursor-pointer rounded-brand border border-borde bg-white text-sm font-semibold transition-colors hover:border-cancelado hover:text-cancelado"
            >
              Cancelar turno
            </button>
          )}

          <div className="mt-6 flex justify-end border-t border-borde pt-6">
            <button
              type="button"
              onClick={onClose}
              className="h-12 w-full cursor-pointer rounded-brand bg-dorado px-6 text-sm font-semibold transition-colors hover:bg-dorado/90 sm:w-auto"
            >
              Cerrar detalle
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}

export default AppointmentDetailDialog;
