import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

function Modal({ open, onClose, title, description, busy = false, children }) {
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
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault(); // Escape
        if (!busy) onClose();
      }}
      onClick={(event) => {
        // clic en el fondo oscuro
        if (event.target === ref.current && !busy) onClose();
      }}
      className="m-auto max-h-[calc(100dvh-3rem)] w-[calc(100%-3rem)] max-w-lg overflow-y-auto rounded-brand bg-fondo p-0 text-charcoal shadow-xl backdrop:bg-charcoal/50"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id={titleId} className="text-2xl md:text-3xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            aria-label="Cerrar"
            className="-mr-2 -mt-1 flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors hover:bg-arena disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X className="size-6" aria-hidden="true" />
          </button>
        </div>

        {description && (
          <p id={descriptionId} className="mt-3 text-sm text-charcoal/60">
            {description}
          </p>
        )}

        {children}
      </div>
    </dialog>
  );
}

export default Modal;
