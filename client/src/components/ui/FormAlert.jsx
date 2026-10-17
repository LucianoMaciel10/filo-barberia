import { CircleAlert } from "lucide-react";

function FormAlert({ show, title, message }) {
  if (!show) return null;

  return (
    <div
      role="alert"
      className="mt-6 flex items-center gap-3 rounded-brand bg-cancelado-suave px-4 py-3 text-cancelado transition-opacity duration-200 starting:opacity-0"
    >
      <CircleAlert className="size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-xs font-semibold">{title}</p>
        <p className="text-xs">{message}</p>
      </div>
    </div>
  );
}

export default FormAlert;