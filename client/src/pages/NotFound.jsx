import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex flex-col items-center px-6 py-16 text-center md:py-24">
      <p
        aria-hidden="true"
        className="font-heading text-[120px] leading-none text-dorado md:text-[200px]"
      >
        404
      </p>

      <div className="mt-8 flex flex-col gap-1.5" aria-hidden="true">
        <span className="size-3.5 rounded-full border-2 border-dorado" />
        <span className="size-3.5 rounded-full border-2 border-dorado" />
      </div>

      <h1 className="mt-8 max-w-md text-[28px] leading-tight md:max-w-none md:text-[40px]">
        <span className="sr-only">Error 404: </span>
        Nos fuimos un poquito de la raya.
      </h1>

      <p className="mt-6 max-w-md text-sm text-charcoal/60">
        La página que buscás no existe o cambió de lugar. Pero tu próximo corte
        sigue acá.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          to="/"
          className="inline-flex h-12 items-center justify-center rounded-brand border border-borde bg-white px-6 text-sm font-semibold transition-colors hover:border-dorado"
        >
          Volver al inicio
        </Link>
        <a
          href="#"
          className="inline-flex h-12 items-center justify-center rounded-brand bg-dorado px-6 text-sm font-semibold transition-colors hover:bg-dorado/90"
        >
          Reservar turno
        </a>
      </div>
    </section>
  );
}

export default NotFound;
