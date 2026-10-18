function BookingStepper({ steps, current }) {
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <nav aria-label="Pasos de la reserva" className="mt-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs md:gap-x-4 md:text-sm">
        {steps.map((step, index) => (
          <li
            key={step.path}
            aria-current={index === current ? "step" : undefined}
            className="flex items-center gap-2 md:gap-4"
          >
            <span
              className={
                index === current
                  ? "font-semibold text-dorado-oscuro"
                  : "text-charcoal/60"
              }
            >
              {index + 1} {step.label}
            </span>
            {index < steps.length - 1 && (
              <span aria-hidden="true" className="text-charcoal/30">
                /
              </span>
            )}
          </li>
        ))}
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
