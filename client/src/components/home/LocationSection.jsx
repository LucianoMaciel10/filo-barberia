import { MapPin, Map as MapIcon } from "lucide-react";
import salonImg from "../../assets/salon-filo.png";
import { business } from "../../data/business";
import { Link } from "react-router-dom";

function LocationSection() {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${business.address}, ${business.neighborhood}, ${business.city}`,
  )}`;

  return (
    <section
      id="barberia"
      className="scroll-mt-20 bg-arena px-6 py-16 md:scroll-mt-24 md:py-20 xl:px-30"
    >
      <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-16">
        {/* Imagen */}
        <img
          src={salonImg}
          alt="Interior de Filo Barbería con dos sillas de cuero frente a espejos"
          loading="lazy"
          width="684"
          height="500"
          className="aspect-4/3 w-full justify-self-center rounded-brand object-cover lg:max-w-none"
        />

        {/* Info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-dorado-oscuro">
            Tu lugar en {business.neighborhood}
          </p>

          <h2 className="mt-6 text-[32px] leading-[1.15] md:text-[40px]">
            Un rato para vos.
            <span className="block">Te esperamos en Filo.</span>
          </h2>

          <p className="mt-6 flex items-start gap-3 text-sm">
            <MapPin
              className="mt-0.5 size-5 shrink-0 text-dorado"
              aria-hidden="true"
            />
            <span>
              {business.address}, {business.neighborhood}
              <span className="block">{business.city}</span>
            </span>
          </p>

          <dl className="mt-6 space-y-4 text-sm">
            {business.hours.map(({ days, time }) => (
              <div key={days} className="flex gap-2">
                <dt className="text-charcoal/60">{days}</dt>
                <dd className="flex gap-2 font-medium">
                  <span aria-hidden="true" className="text-charcoal/40">
                    ·
                  </span>
                  {time}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-brand border border-borde bg-white px-5 text-sm font-semibold transition-colors hover:border-dorado"
            >
              <MapIcon className="size-5" aria-hidden="true" />
              Cómo llegar
            </a>
            <Link
              to="/reservar"
              className="inline-flex h-12 items-center rounded-brand bg-dorado px-6 text-sm font-semibold transition-colors hover:bg-dorado/90"
            >
              Reservar turno
            </Link>
          </div>

          <p className="mt-6 text-xs text-charcoal/60">
            ¿Tenés una consulta?{" "}
            <a href={`tel:${business.phone}`} className="hover:text-dorado">
              {business.phoneDisplay}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default LocationSection;
