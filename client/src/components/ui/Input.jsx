import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Input({ label, error, hint, type = "text", ref, ...props }) {
  const id = useId();
  const messageId = `${id}-message`;
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const message = error ?? hint;

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
          aria-describedby={message ? messageId : undefined}
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

      <p
        id={messageId}
        className={`mt-1 min-h-4 text-xs ${
          error ? "text-cancelado" : "text-charcoal/60"
        }`}
      >
        {message}
      </p>
    </div>
  );
}

export default Input;
