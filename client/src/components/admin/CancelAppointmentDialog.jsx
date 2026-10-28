import { useState } from "react";
import { parseISO } from "date-fns";
import ConfirmDialog from "../ui/ConfirmDialog";
import DetailList from "../ui/DetailList";
import { getAdminBarberLabel, getBarberById } from "../../data/barbers";
import { getServiceById } from "../../data/services";
import { cancelAppointment } from "../../services/appointments";
import { formatDayMonth } from "../../utils/format";

function CancelAppointmentDialog({ appointment, onClose, onCancelled }) {
  const [busy, setBusy] = useState(false);

  const handleConfirm = async () => {
    setBusy(true);
    await cancelAppointment(appointment.id);
    setBusy(false);
    onCancelled(appointment);
  };

  return (
    <ConfirmDialog
      open={!!appointment}
      busy={busy}
      title="¿Querés cancelar este turno?"
      description="Vamos a liberar este horario. El cliente va a ver el turno como cancelado."
      confirmLabel="Sí, cancelar turno"
      onConfirm={handleConfirm}
      onCancel={onClose}
    >
      {appointment && (
        <DetailList
          className="mt-6"
          rows={[
            ["Cliente", appointment.clientName],
            ["Servicio", getServiceById(appointment.serviceId).name],
            [
              "Fecha",
              `${formatDayMonth(parseISO(appointment.date))} · ${appointment.time}`,
            ],
            [
              "Barbero",
              getAdminBarberLabel(getBarberById(appointment.barberId)),
            ],
          ]}
        />
      )}
    </ConfirmDialog>
  );
}

export default CancelAppointmentDialog;
