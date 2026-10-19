import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const itemClass = "flex items-center gap-1 py-1";

function BookingStepper({ steps, current, reachable }) {
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <nav aria-label="Pasos de la reserva" className="mt-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:gap-x-4 md:text-sm">
        {steps.map((step, index) => {
          const isCurrent = index === current;
          const isCompleted = index < reachable && !isCurrent;
          const isEnabled = index <= reachable && !isCurrent;

          const content = (
            <>
              {isCompleted ? (
                <>
                  <Check className="size-4 shrink-0" aria-hidden="true" />
                  <span className="sr-only">Completado:</span>
                </>
              ) : (
                <span>{index + 1}</span>
              )}
              <span>{step.label}</span>
            </>
          );

          return (
            <li key={step.path} className="flex items-center gap-2 md:gap-4">
              {isCurrent && (
                <span
                  aria-current="step"
                  className={`${itemClass} font-semibold text-dorado-oscuro`}
                >
                  {content}
                </span>
              )}

              {isEnabled && (
                <Link
                  to={`/reservar/${step.path}`}
                  className={`${itemClass} text-charcoal/70 transition-colors hover:text-dorado-oscuro`}
                >
                  {content}
                </Link>
              )}

              {!isCurrent && !isEnabled && (
                <span className={`${itemClass} text-charcoal/40`}>
                  {content}
                </span>
              )}

              {index < steps.length - 1 && (
                <span aria-hidden="true" className="text-charcoal/30">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-3 h-0.75 w-full overflow-hidden rounded-full bg-borde">
        <div
          className="h-full bg-dorado transition-[width] duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </nav>
  );
}

export default BookingStepper;
