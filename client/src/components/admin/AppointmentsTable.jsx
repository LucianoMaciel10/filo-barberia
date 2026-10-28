import { Eye, X } from "lucide-react";
import StatusBadge from "../ui/StatusBadge";
import { getAdminBarberLabel } from "../../data/barbers";
import {
  formatDateWithYear,
  formatPrice,
  formatTimeRange,
} from "../../utils/format";

const iconButton =
  "flex size-9 cursor-pointer items-center justify-center rounded-lg transition-colors";

// "confirmed" = confirmado y todavía no pasó
const isCancellable = (row) => row.displayStatus === "confirmed";

function AppointmentsTable({ rows, onDetail, onCancel }) {
  return (
    <>
      {/* Escritorio: tabla */}
      <div className="hidden overflow-hidden rounded-brand border border-borde bg-white shadow-sm lg:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Turnos</caption>
          <thead className="bg-arena text-xs uppercase tracking-wide">
            <tr>
              <th scope="col" className="px-5 py-4 font-semibold">
                Cliente
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Servicio
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Fecha y hora
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Barbero
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Estado
              </th>
              <th scope="col" className="px-5 py-4 font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-borde">
                <th scope="row" className="px-5 py-4 text-left font-medium">
                  {row.clientName}
                </th>
                <td className="px-5 py-4">{row.service.name}</td>
                <td className="px-5 py-4">
                  {formatDateWithYear(row.date)}
                  <span className="block text-xs text-charcoal/60">
                    {formatTimeRange(row.time, row.service.duration)}
                  </span>
                </td>
                <td className="px-5 py-4">{getAdminBarberLabel(row.barber)}</td>
                <td className="px-5 py-4">
                  <StatusBadge status={row.displayStatus} />
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => onDetail(row)}
                      aria-label={`Ver detalle del turno de ${row.clientName}`}
                      className={`${iconButton} text-charcoal/70 hover:bg-arena hover:text-charcoal`}
                    >
                      <Eye className="size-5" aria-hidden="true" />
                    </button>
                    {isCancellable(row) && (
                      <button
                        type="button"
                        onClick={() => onCancel(row)}
                        aria-label={`Cancelar turno de ${row.clientName}`}
                        className={`${iconButton} text-cancelado hover:bg-cancelado-suave`}
                      >
                        <X className="size-5" aria-hidden="true" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: tarjetas */}
      <ul className="space-y-4 lg:hidden">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-brand border border-borde bg-white p-5 shadow-sm"
          >
            <h3 className="text-2xl">{row.clientName}</h3>
            <p className="mt-1 text-sm font-semibold">{row.service.name}</p>
            <p className="mt-1 text-xs text-charcoal/60">
              {formatDateWithYear(row.date)} ·{" "}
              {formatTimeRange(row.time, row.service.duration)}
            </p>
            <p className="text-xs text-charcoal/60">
              {getAdminBarberLabel(row.barber)} ·{" "}
              {formatPrice(row.service.price)} ARS
            </p>

            <div className="mt-3">
              <StatusBadge status={row.displayStatus} />
            </div>

            <div className="mt-4 flex gap-5 text-sm font-semibold text-dorado-oscuro">
              <button
                type="button"
                onClick={() => onDetail(row)}
                aria-label={`Ver detalle del turno de ${row.clientName}`}
                className="cursor-pointer hover:underline"
              >
                Ver detalle
              </button>
              {isCancellable(row) && (
                <button
                  type="button"
                  onClick={() => onCancel(row)}
                  aria-label={`Cancelar turno de ${row.clientName}`}
                  className="cursor-pointer hover:underline"
                >
                  × Cancelar
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default AppointmentsTable;
