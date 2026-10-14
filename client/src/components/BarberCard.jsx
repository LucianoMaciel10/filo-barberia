import { ArrowUpRight } from "lucide-react";

function BarberCard({ barber }) {
  const { name, specialty, photo } = barber;

  return (
    <a
      href="#"
      aria-label={`Reservar turno con ${name}`}
      className="group block"
    >
      <img
        src={photo}
        alt={`${name}, barbero de Filo`}
        loading="lazy"
        width="411"
        height="330"
        className="aspect-5/4 w-full rounded-brand object-cover"
      />

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl">{name}</h3>
          <p className="mt-1 text-sm text-charcoal/60">{specialty}</p>
        </div>
        <ArrowUpRight
          className="size-6 shrink-0 text-dorado transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}

export default BarberCard;
