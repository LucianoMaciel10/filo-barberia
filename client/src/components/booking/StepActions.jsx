import { Link } from "react-router-dom";

function StepActions({
  canContinue,
  onContinue,
  continueLabel = "Continuar",
  backTo,
  note = "Podés cambiar tu elección antes de confirmar.",
}) {
  return (
    <div className="mt-4">
      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className="h-12 w-full cursor-pointer rounded-brand bg-dorado text-sm font-semibold transition-colors hover:bg-dorado/90 disabled:cursor-not-allowed disabled:bg-arena disabled:text-charcoal/40 disabled:hover:bg-arena"
      >
        {continueLabel}
      </button>

      {backTo && (
        <Link
          to={backTo}
          className="mt-3 flex h-12 w-full items-center justify-center rounded-brand border border-borde bg-white text-sm font-semibold transition-colors hover:border-dorado"
        >
          Volver al paso anterior
        </Link>
      )}

      <p className="mt-3 text-xs text-charcoal/60">{note}</p>
    </div>
  );
}

export default StepActions;
