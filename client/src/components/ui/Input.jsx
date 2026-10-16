import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({ label, error, hint, type = "text", ref, ...props }) {
  const id = useId();
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const [show, setShow] = useState(false);
  const isPassword = type === "password";

  return (
    <div>
      <label htmlFor={id} className="text-xs font-semibold">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          ref={ref}
          id={id}
          type={isPassword && show ? "text" : type}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          className={`h-12 w-full rounded-brand border bg-white px-4 text-sm placeholder:text-charcoal/40 ${
            error ? "border-cancelado" : "border-borde"
          } ${isPassword ? "pr-12" : ""}`}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-charcoal/60 hover:text-charcoal cursor-pointer"
          >
            {show ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>

      {error ? (
        <p id={errorId} className="mt-1 text-xs text-cancelado">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="mt-1 text-xs text-charcoal/60">
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default Input;
