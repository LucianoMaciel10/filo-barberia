import { ArrowUpRight, MapPin } from "lucide-react";
import heroImg from "../../assets/hero-barberia.png";
import { business } from "../../data/business";

function Hero() {
  return (
    <section className="flex-1 grid items-center gap-8 py-10 md:py-16 md:grid-cols-2">
      {/* Texto */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-dorado-oscuro">
          Oficio, estilo y un buen momento
        </p>

        <h1 className="mt-6 text-[40px] leading-[1.1] lg:text-[56px] xl:text-7xl">
          Tu estilo.
          <span className="block text-nowrap">Nuestro oficio.</span>
        </h1>

        <p className="mt-6  text-charcoal/70">
          Un corte que te representa, una charla sin apuro.
          <span className="block"> Tu próxima visita a Filo empieza acá.</span>
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <a
            href="#"
            className="inline-flex h-12 items-center gap-2 rounded-brand bg-dorado px-6 text-sm font-semibold transition-colors hover:bg-dorado/90"
          >
            <ArrowUpRight className="size-5" aria-hidden="true" />
            Reservar turno
          </a>
          <a
            href="#servicios"
            className="text-sm font-semibold transition-colors hover:text-dorado"
          >
            Ver servicios
          </a>
        </div>

        <p className="mt-8 flex items-center gap-2 text-sm text-charcoal/60">
          <MapPin className="size-4 text-dorado" aria-hidden="true" />
          {business.neighborhood}, {business.city} · Desde{" "}
          {business.foundedYear}
        </p>
      </div>

      {/* Imagen */}
      <figure className="mx-auto w-full lg:justify-self-end">
        <img
          src={heroImg}
          alt="Barbero cortando el pelo a un cliente en una silla de cuero dentro de Filo Barbería"
          width="684"
          height="500"
          fetchPriority="high"
          className="aspect-4/3 w-full rounded-brand object-cover"
        />
      </figure>
    </section>
  );
}

export default Hero;
