import { useId, useMemo, useState } from "react";
import { addDays, format, subDays } from "date-fns";
import { FilterX, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import AppointmentDetailDialog from "../../components/admin/AppointmentDetailDialog";
import AppointmentsTable from "../../components/admin/AppointmentsTable";
import CancelAppointmentDialog from "../../components/admin/CancelAppointmentDialog";
import PageHeader from "../../components/admin/PageHeader";
import FormAlert from "../../components/ui/FormAlert";
import Pagination from "../../components/ui/Pagination";
import Select from "../../components/ui/Select";
import { ANY_BARBER_ID, barbers } from "../../data/barbers";
import { business } from "../../data/business";
import {
  filterAppointments,
  listAppointments,
} from "../../services/adminAppointments";
import { pluralize } from "../../utils/format";

const PAGE_SIZE = 8;
const DEFAULT_RANGE_DAYS = 14;

const statusOptions = [
  { value: "all", label: "Todos los estados" },
  { value: "confirmed", label: "Confirmado" },
  { value: "completed", label: "Completado" },
  { value: "cancelled", label: "Cancelado" },
];

const barberOptions = [
  { value: "all", label: "Todos los barberos" },
  ...barbers.map((barber) => ({ value: barber.id, label: barber.name })),
  { value: ANY_BARBER_ID, label: "Sin asignar" },
];

const fieldClass =
  "h-12 w-full rounded-brand border border-borde bg-white text-sm";

const toKey = (date) => format(date, "yyyy-MM-dd");
const clamp = (value, min, max) =>
  value < min ? min : value > max ? max : value;

function Appointments() {
  const searchId = useId();
  const [now] = useState(() => new Date());
  const minKey = toKey(subDays(now, 365));
  const maxKey = toKey(addDays(now, 365));

  const [defaults] = useState(() => ({
    query: "",
    status: "all",
    barberId: "all",
    from: toKey(now),
    to: toKey(addDays(now, DEFAULT_RANGE_DAYS - 1)),
  }));
  const [filters, setFilters] = useState(defaults);
  const [page, setPage] = useState(1);
  const [version, setVersion] = useState(0); // fuerza a releer tras cancelar
  const [detail, setDetail] = useState(null);
  const [toCancel, setToCancel] = useState(null);
  const [cancelled, setCancelled] = useState(false);

  const updateFilters = (changes) => {
    setFilters((prev) => ({ ...prev, ...changes }));
    setPage(1);
    setCancelled(false);
  };
  const clearFilters = () => updateFilters(defaults);
  const isDefault = Object.keys(defaults).every(
    (key) => filters[key] === defaults[key],
  );

  const activeCount = [
    filters.query !== defaults.query,
    filters.status !== defaults.status,
    filters.barberId !== defaults.barberId,
    filters.from !== defaults.from || filters.to !== defaults.to,
  ].filter(Boolean).length;

  // Las fechas escritas a medias no se corrigen mientras se tipea:
  // se acotan solo al calcular el listado
  const from = clamp(filters.from, minKey, maxKey);
  const to = clamp(filters.to, minKey, maxKey);
  const invalidRange = to < from;

  const all = useMemo(
    () => (invalidRange ? [] : listAppointments({ from, to })),
    // `version` fuerza a releer los turnos guardados después de cancelar
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [from, to, invalidRange, version],
  );
  const filtered = useMemo(
    () => filterAppointments(all, filters),
    [all, filters],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const requestCancel = (appointment) => {
    setDetail(null);
    setToCancel(appointment);
  };

  return (
    <>
      <PageHeader
        section="Turnos"
        title="Turnos"
        subtitle="Buscá y organizá las reservas de Filo."
      >
        <Link
          to="/admin/agenda"
          className="inline-flex h-12 items-center rounded-brand border border-borde bg-white px-5 text-sm font-semibold transition-colors hover:border-dorado"
        >
          Ver agenda
        </Link>
      </PageHeader>

      <form
        role="search"
        aria-label="Filtrar turnos"
        onSubmit={(event) => event.preventDefault()}
        className="mt-8 grid gap-4 lg:grid-cols-[1.3fr_1fr_1.5fr_1fr]"
      >
        <div>
          <label htmlFor={searchId} className="text-xs font-semibold">
            Buscar cliente
          </label>
          <div className="relative mt-2">
            <input
              id={searchId}
              type="text"
              autoComplete="off"
              placeholder="Nombre, correo o teléfono"
              value={filters.query}
              onChange={(event) => updateFilters({ query: event.target.value })}
              className={`${fieldClass} pl-4 pr-12 placeholder:text-charcoal/40`}
            />
            {filters.query ? (
              <button
                type="button"
                onClick={() => updateFilters({ query: "" })}
                aria-label="Borrar búsqueda"
                className="absolute inset-y-0 right-0 flex w-12 cursor-pointer items-center justify-center text-charcoal/60 hover:text-charcoal"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            ) : (
              <Search
                className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-charcoal/60"
                aria-hidden="true"
              />
            )}
          </div>
        </div>

        <Select
          label="Estado"
          options={statusOptions}
          value={filters.status}
          onChange={(event) => updateFilters({ status: event.target.value })}
        />

        <fieldset className="min-w-0">
          <legend className="text-xs font-semibold leading-6">
            Fecha (desde — hasta)
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <input
              type="date"
              aria-label="Desde"
              value={filters.from}
              max={filters.to}
              onChange={(event) =>
                event.target.value &&
                updateFilters({ from: event.target.value })
              }
              onBlur={() => filters.from !== from && updateFilters({ from })}
              className={`${fieldClass} px-3`}
            />
            <input
              type="date"
              aria-label="Hasta"
              value={filters.to}
              min={filters.from}
              onChange={(event) =>
                event.target.value && updateFilters({ to: event.target.value })
              }
              onBlur={() => filters.to !== to && updateFilters({ to })}
              className={`${fieldClass} px-3`}
            />
          </div>
        </fieldset>

        <Select
          label="Barbero"
          options={barberOptions}
          value={filters.barberId}
          onChange={(event) => updateFilters({ barberId: event.target.value })}
        />

        <button
          type="button"
          onClick={clearFilters}
          disabled={isDefault}
          className="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-brand border border-borde bg-white px-5 text-sm font-semibold transition-colors enabled:border-dorado enabled:bg-dorado-suave enabled:hover:bg-dorado/30 disabled:cursor-not-allowed disabled:text-charcoal/40 lg:col-span-4 lg:h-10 lg:w-auto lg:justify-self-end"
        >
          <FilterX className="size-4" aria-hidden="true" />
          Limpiar filtros{activeCount > 0 && ` (${activeCount})`}
        </button>
      </form>

      <FormAlert
        show={invalidRange}
        title="Revisá las fechas"
        message="La fecha desde no puede ser posterior a la fecha hasta."
      />
      <FormAlert
        show={cancelled}
        variant="success"
        title="Cancelamos el turno"
        message="El horario quedó libre para nuevas reservas."
      />

      <div className="mt-6">
        {filtered.length === 0 ? (
          !invalidRange && (
            <div className="rounded-brand border border-borde bg-white px-6 py-12 text-center shadow-sm">
              <h2 className="text-2xl">No encontramos turnos.</h2>
              <p className="mt-2 text-sm text-charcoal/60">
                Probá con otro nombre o ampliá el rango de fechas.
              </p>
              {!isDefault && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 h-12 cursor-pointer rounded-brand border border-borde bg-white px-6 text-sm font-semibold transition-colors hover:border-dorado"
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )
        ) : (
          <AppointmentsTable
            rows={rows}
            onDetail={setDetail}
            onCancel={requestCancel}
          />
        )}
      </div>

      {filtered.length > 0 && (
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="text-xs text-charcoal/60">
            Mostrando {startIndex + 1}–{startIndex + rows.length} de{" "}
            {pluralize(filtered.length, "resultado", "resultados")}
          </p>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={setPage}
          />
        </div>
      )}

      <p className="mt-8 text-xs text-charcoal/60">
        Acciones: ver detalle · × cancelar (solo turnos confirmados que todavía
        no pasaron)
      </p>
      <p className="mt-4 text-xs text-charcoal/60">
        Datos ilustrativos · {business.name} · {business.city}
      </p>

      <AppointmentDetailDialog
        appointment={detail}
        onClose={() => setDetail(null)}
        onCancel={requestCancel}
      />

      <CancelAppointmentDialog
        appointment={toCancel}
        onClose={() => setToCancel(null)}
        onCancelled={() => {
          setToCancel(null);
          setVersion((value) => value + 1);
          setCancelled(true);
        }}
      />
    </>
  );
}

export default Appointments;
