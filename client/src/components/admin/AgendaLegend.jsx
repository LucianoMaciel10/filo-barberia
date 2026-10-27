import StatusBadge from "../ui/StatusBadge";

const STATUSES = ["confirmed", "completed", "cancelled"];

function AgendaLegend() {
  return (
    <ul aria-label="Referencias de color" className="mt-5 flex flex-wrap gap-2">
      {STATUSES.map((status) => (
        <li key={status}>
          <StatusBadge status={status} />
        </li>
      ))}
    </ul>
  );
}

export default AgendaLegend;
