import { parseISO } from "date-fns";
import { formatLongDate } from "../../utils/format";

const STYLES = {
  confirmed: "border-confirmado bg-confirmado-suave text-confirmado",
  completed: "border-confirmado/50 bg-confirmado-suave/60 text-confirmado/80",
  cancelled: "border-cancelado bg-cancelado-suave text-cancelado",
};

const STATUS_TEXT = {
  confirmed: "confirmado",
  completed: "completado",
  cancelled: "cancelado",
};

function AgendaBlock({ item, onSelect, className = "", style }) {
  const compact = item.service.duration < 30; // no entra una segunda línea

  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
      style={style}
      aria-label={`${item.clientName}, ${item.service.name}, ${formatLongDate(parseISO(item.date))} a las ${item.time}, ${STATUS_TEXT[item.displayStatus]}`}
      className={`flex cursor-pointer flex-col overflow-hidden rounded-lg border-l-4 px-2 py-1 text-left text-xs leading-4 transition-shadow hover:shadow-md ${STYLES[item.displayStatus]} ${className}`}
    >
      <span className="truncate font-semibold">
        {item.time} · {item.clientName}
      </span>
      {!compact && (
        <span className="truncate opacity-80">{item.service.name}</span>
      )}
    </button>
  );
}

export default AgendaBlock;
