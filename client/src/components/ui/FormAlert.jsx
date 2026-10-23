import { CircleAlert, CircleCheck } from "lucide-react";

const VARIANTS = {
  error: {
    Icon: CircleAlert,
    role: "alert",
    style: "bg-cancelado-suave text-cancelado",
  },
  success: {
    Icon: CircleCheck,
    role: "status",
    style: "bg-confirmado-suave text-confirmado",
  },
};

function FormAlert({ show, title, message, variant = "error" }) {
  if (!show) return null;
  const { Icon, role, style } = VARIANTS[variant];

  return (
    <div
      role={role}
      className={`mt-6 flex items-center gap-3 rounded-brand px-4 py-3 transition-opacity duration-200 starting:opacity-0 ${style}`}
    >
      <Icon className="size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-xs">{message}</p>
      </div>
    </div>
  );
}

export default FormAlert;
