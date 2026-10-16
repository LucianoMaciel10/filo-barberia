import { useId } from "react";

function Checkbox({ label, error, ref, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div>
      <div className="flex items-center gap-3">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="mt-0.5 size-5 shrink-0 cursor-pointer accent-dorado"
          {...props}
        />
        <label htmlFor={id} className="cursor-pointer text-xs text-charcoal/70">
          {label}
        </label>
      </div>

      {error && (
        <p id={errorId} className="mt-1 text-xs text-cancelado">
          {error}
        </p>
      )}
    </div>
  );
}

export default Checkbox;
