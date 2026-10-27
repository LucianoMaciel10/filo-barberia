import Modal from "./Modal";

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
  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      description={description}
      busy={busy}
    >
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
    </Modal>
  );
}

export default ConfirmDialog;
