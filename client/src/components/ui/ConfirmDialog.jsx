import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

function ConfirmDialog({
  open,
  title,
  description,
  children,
  confirmLabel,
  cancelLabel = "Volver",
  busy = false,
  onConfirm,
  onCancel,
}) {
  const ref = useRef(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault(); // Escape
        if (!busy) onCancel();
      }}
      onClick={(event) => {
        // clic en el fondo oscuro
        if (event.target === ref.current && !busy) onCancel();
      }}
      className="m-auto w-[calc(100%-3rem)] max-w-lg rounded-brand bg-fondo p-0 text-charcoal shadow-xl backdrop:bg-charcoal/50"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl md:text-3xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            aria-label="Cerrar"
            className="-mr-2 -mt-1 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-arena disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        <p id={descriptionId} className="mt-3 text-sm text-charcoal/60">
          {description}
        </p>

        {children}

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-borde pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="h-12 w-full cursor-pointer rounded-brand border border-borde bg-white px-6 text-sm font-semibold transition-colors hover:border-dorado disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="h-12 w-full cursor-pointer rounded-brand bg-cancelado px-6 text-sm font-semibold text-white transition-colors hover:bg-cancelado/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {busy ? "Cancelando..." : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
