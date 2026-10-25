import StatusBadge from "../ui/StatusBadge";
import { ANY_BARBER_ID, getBarberById } from "../../data/barbers";
import { getServiceById } from "../../data/services";
import { formatShortDate, formatTimeRange } from "../../utils/format";

const barberName = (barber) =>
  barber.id === ANY_BARBER_ID ? "Sin asignar" : barber.name;

function TodayAppointments({ appointments }) {
  if (appointments.length === 0) {
    return (
      <p className="rounded-brand border border-borde bg-white px-6 py-10 text-center text-sm text-charcoal/60 shadow-sm">
        No hay turnos para hoy.
      </p>
    );
  }

  const rows = appointments.map((appointment) => ({
    ...appointment,
    service: getServiceById(appointment.serviceId),
    barber: getBarberById(appointment.barberId),
  }));

  return (
    <>
      {/* Escritorio: tabla */}
      <div className="hidden overflow-hidden rounded-brand border border-borde bg-white shadow-sm md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Turnos de hoy</caption>
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
                Estado
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-borde">
                <th scope="row" className="px-5 py-4 font-semibold">
                  {row.clientName}
                </th>
                <td className="px-5 py-4">
                  {row.service.name}
                  <span className="block text-xs text-charcoal/60">
                    {barberName(row.barber)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  {formatShortDate(row.date)}
                  <span className="block text-xs text-charcoal/60">
                    {formatTimeRange(row.time, row.service.duration)}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <StatusBadge status={row.displayStatus} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: tarjetas */}
      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li
            key={row.id}
            className="rounded-brand border border-borde bg-white p-4 shadow-sm"
          >
            <p className="font-semibold">{row.clientName}</p>
            <p className="mt-1 text-sm">{row.service.name}</p>
            <p className="mt-1 text-xs text-charcoal/60">
              {formatShortDate(row.date)} ·{" "}
              {formatTimeRange(row.time, row.service.duration)}
            </p>
            <p className="text-xs text-charcoal/60">{barberName(row.barber)}</p>
            <div className="mt-3">
              <StatusBadge status={row.displayStatus} />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodayAppointments;
