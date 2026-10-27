import { useMemo, useState } from "react";
import { addWeeks, format, isSameDay, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import AppointmentDetailDialog from "../../components/admin/AppointmentDetailDialog";
import DayAgenda from "../../components/admin/DayAgenda";
import PageHeader from "../../components/admin/PageHeader";
import WeekAgenda from "../../components/admin/WeekAgenda";
import DetailList from "../../components/ui/DetailList";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import FormAlert from "../../components/ui/FormAlert";
import Select from "../../components/ui/Select";
import {
  ANY_BARBER_ID,
  barbers,
  getAdminBarberLabel,
  getBarberById,
} from "../../data/barbers";
import { business } from "../../data/business";
import { getServiceById } from "../../data/services";
import { getWeekAgenda } from "../../services/agenda";
import { getWorkWeekStart } from "../../services/adminStats";
import { cancelAppointment } from "../../services/appointments";
import { formatDayMonth, formatWeekTitle } from "../../utils/format";
import AgendaLegend from "../../components/admin/AgendaLegend";

const barberOptions = [
  ...barbers.map((barber) => ({ value: barber.id, label: barber.name })),
  { value: ANY_BARBER_ID, label: "Sin asignar" },
];

const arrowButton =
  "flex size-10 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-arena";

function Agenda() {
  const [now] = useState(() => new Date());
  const currentWeek = useMemo(() => getWorkWeekStart(now), [now]);

  const [weekStart, setWeekStart] = useState(currentWeek);
  const [barberId, setBarberId] = useState(barbers[0].id);
  const [selectedKey, setSelectedKey] = useState(null); // día elegido en mobile
  const [detail, setDetail] = useState(null);
  const [toCancel, setToCancel] = useState(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [version, setVersion] = useState(0); // fuerza a releer los turnos tras cancelar

  const days = useMemo(
    () => getWeekAgenda(weekStart, barberId),
    [weekStart, barberId, version],
  );

  const todayKey = format(now, "yyyy-MM-dd");
  const activeKey =
    days.find((day) => day.key === selectedKey)?.key ??
    days.find((day) => day.key === todayKey)?.key ??
    days[0].key;

  const weekTitle = formatWeekTitle(days[0].date, days.at(-1).date);
  const isCurrentWeek = isSameDay(weekStart, currentWeek);
  const total = days.reduce((sum, day) => sum + day.items.length, 0);
  const barberName = getAdminBarberLabel(getBarberById(barberId));

  const changeWeek = (weeks) => {
    setWeekStart(addWeeks(weekStart, weeks));
    setCancelled(false);
  };

  const requestCancel = (appointment) => {
    setDetail(null);
    setToCancel(appointment);
  };

  const confirmCancel = async () => {
    setCancelling(true);
    await cancelAppointment(toCancel.id);
    setCancelling(false);
    setToCancel(null);
    setVersion((value) => value + 1);
    setCancelled(true);
  };

  const cancelService = toCancel && getServiceById(toCancel.serviceId);

  return (
    <>
      <PageHeader
        section="Agenda"
        title="Agenda"
        subtitle="Un vistazo a la semana, con tiempo para cada cliente."
      />

      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => changeWeek(-1)}
            aria-label="Semana anterior"
            className={arrowButton}
          >
            <ChevronLeft className="size-6" aria-hidden="true" />
          </button>

          <h2 aria-live="polite" className="text-2xl md:text-3xl">
            {weekTitle}
          </h2>

          <button
            type="button"
            onClick={() => changeWeek(1)}
            aria-label="Semana siguiente"
            className={arrowButton}
          >
            <ChevronRight className="size-6" aria-hidden="true" />
          </button>

          {!isCurrentWeek && (
            <button
              type="button"
              onClick={() => {
                setWeekStart(currentWeek);
                setCancelled(false);
              }}
              className="ml-2 cursor-pointer text-sm font-semibold text-dorado-oscuro hover:underline"
            >
              Volver a hoy
            </button>
          )}
        </div>

        <Select
          label="Barbero"
          options={barberOptions}
          value={barberId}
          onChange={(event) => {
            setBarberId(event.target.value);
            setCancelled(false);
          }}
          className="w-full lg:w-64"
        />
      </div>

      <AgendaLegend />

      <FormAlert
        show={cancelled}
        variant="success"
        title="Cancelamos el turno"
        message="El horario quedó libre para nuevas reservas."
      />

      {total === 0 && (
        <p className="mt-6 rounded-brand border border-borde bg-white px-5 py-4 text-sm text-charcoal/60 shadow-sm">
          {barberName} no tiene turnos esta semana.
        </p>
      )}

      <div className="mt-6">
        <WeekAgenda days={days} todayKey={todayKey} onSelect={setDetail} />
        <DayAgenda
          days={days}
          activeKey={activeKey}
          onChangeDay={setSelectedKey}
          onSelect={setDetail}
        />
      </div>

      <p className="mt-6 text-xs text-charcoal/60">
        Horario de Buenos Aires · Sábados hasta las {business.schedule[6].close}{" "}
        · Domingos cerrado
      </p>
      <p className="mt-4 text-xs text-charcoal/60">
        Datos ilustrativos · {business.name} · {business.city}
      </p>

      <AppointmentDetailDialog
        appointment={detail}
        onClose={() => setDetail(null)}
        onCancel={requestCancel}
      />

      <ConfirmDialog
        open={!!toCancel}
        busy={cancelling}
        title="¿Querés cancelar este turno?"
        description="Vamos a liberar este horario. El cliente va a ver el turno como cancelado."
        confirmLabel="Sí, cancelar turno"
        onConfirm={confirmCancel}
        onCancel={() => setToCancel(null)}
      >
        {toCancel && (
          <DetailList
            className="mt-6"
            rows={[
              ["Cliente", toCancel.clientName],
              ["Servicio", cancelService.name],
              [
                "Fecha",
                `${formatDayMonth(parseISO(toCancel.date))} · ${toCancel.time}`,
              ],
              [
                "Barbero",
                getAdminBarberLabel(getBarberById(toCancel.barberId)),
              ],
            ]}
          />
        )}
      </ConfirmDialog>
    </>
  );
}

export default Agenda;
