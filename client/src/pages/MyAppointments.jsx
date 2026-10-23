import { useState } from "react";
import { parseISO } from "date-fns";
import { CalendarX } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentCard from "../components/appointments/AppointmentCard";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import FormAlert from "../components/ui/FormAlert";
import Tabs from "../components/ui/Tabs";
import { getServiceById } from "../data/services";
import { useAppointments } from "../hooks/useAppointments";
import { getStart } from "../services/appointments";
import { formatDayMonth } from "../utils/format";
import DetailList from "../components/ui/DetailList";
import { getBarberById, getBarberLabel } from "../data/barbers";

const UPCOMING = ["confirmed", "pending"];

function EmptyState({ title, text, showAction }) {
  return (
    <div className="rounded-brand border border-borde bg-white px-6 py-12 text-center shadow-sm">
      <CalendarX
        className="mx-auto size-8 text-dorado"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <h2 className="mt-4 text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-charcoal/60">{text}</p>
      {showAction && (
        <Link
          to="/reservar"
          className="mt-6 inline-flex h-12 items-center rounded-brand bg-dorado px-6 text-sm font-semibold transition-colors hover:bg-dorado/90"
        >
          Reservar turno
        </Link>
      )}
    </div>
  );
}

function MyAppointments() {
  const { appointments, cancel } = useAppointments();
  const [tab, setTab] = useState("upcoming");
  const [target, setTarget] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const upcoming = appointments
    .filter((a) => UPCOMING.includes(a.displayStatus))
    .sort((a, b) => getStart(a) - getStart(b));
  const history = appointments
    .filter((a) => !UPCOMING.includes(a.displayStatus))
    .sort((a, b) => getStart(b) - getStart(a));

  const tabs = [
    { id: "upcoming", label: `Próximos (${upcoming.length})` },
    { id: "history", label: "Historial" },
  ];
  const list = tab === "upcoming" ? upcoming : history;

  const handleTabChange = (id) => {
    setTab(id);
    setCancelled(false);
  };

  const handleConfirmCancel = async () => {
    setCancelling(true);
    await cancel(target.id);
    setCancelling(false);
    setTarget(null);
    setCancelled(true);
  };

  const targetService = target && getServiceById(target.serviceId);

  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-10 md:py-14">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-[32px] leading-tight md:text-[40px]">
            Mis turnos
          </h1>
          <p className="mt-1 text-sm text-charcoal/60">
            Tus visitas a Filo, siempre a mano.
          </p>
        </div>

        <Link
          to="/reservar"
          className="inline-flex h-12 items-center rounded-brand bg-dorado px-6 text-sm font-semibold transition-colors hover:bg-dorado/90"
        >
          Reservar turno
        </Link>
      </div>

      <FormAlert
        show={cancelled}
        variant="success"
        title="Cancelamos tu turno"
        message="Liberamos el horario. Lo vas a ver en tu historial."
      />

      <div className="mt-8">
        <Tabs
          tabs={tabs}
          value={tab}
          onChange={handleTabChange}
          label="Tus turnos"
        />
      </div>

      <div
        role="tabpanel"
        id="tab-panel"
        aria-labelledby={`tab-${tab}`}
        className="mt-6"
      >
        {list.length === 0 ? (
          tab === "upcoming" ? (
            <EmptyState
              title="Todavía no tenés próximos turnos."
              text="Reservá en unos minutos y elegí el día que mejor te quede."
              showAction
            />
          ) : (
            <EmptyState
              title="Todavía no tenés historial."
              text="Acá vas a ver los turnos que ya pasaron o cancelaste."
            />
          )
        ) : (
          <ul className="space-y-4">
            {list.map((appointment) => (
              <li key={appointment.id}>
                <AppointmentCard
                  appointment={appointment}
                  onCancel={setTarget}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmDialog
        open={!!target}
        busy={cancelling}
        title="¿Querés cancelar tu turno?"
        description="Vamos a liberar este horario. Podés volver a reservar cuando quieras."
        confirmLabel="Sí, cancelar turno"
        onConfirm={handleConfirmCancel}
        onCancel={() => setTarget(null)}
      >
        {target && (
          <>
            <DetailList
              className="mt-6"
              rows={[
                ["Servicio", targetService.name],
                [
                  "Fecha",
                  `${formatDayMonth(parseISO(target.date))} · ${target.time}`,
                ],
                ["Barbero", getBarberLabel(getBarberById(target.barberId))],
              ]}
            />
            <p className="mt-6 text-xs text-charcoal/60">
              La cancelación no tiene costo. El turno todavía está confirmado
              hasta que aceptes.
            </p>
          </>
        )}
      </ConfirmDialog>
    </section>
  );
}

export default MyAppointments;
