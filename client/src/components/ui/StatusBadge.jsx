const STATUS = {
  confirmed: {
    label: "Confirmado",
    style: "bg-confirmado-suave text-confirmado",
  },
  pending: { label: "Pendiente", style: "bg-pendiente text-dorado-oscuro" },
  cancelled: { label: "Cancelado", style: "bg-cancelado-suave text-cancelado" },
  completed: {
    label: "Completado",
    style: "bg-confirmado-suave text-confirmado",
  },
};

function StatusBadge({ status }) {
  const { label, style } = STATUS[status];

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${style}`}
    >
      {label}
    </span>
  );
}

export default StatusBadge;
