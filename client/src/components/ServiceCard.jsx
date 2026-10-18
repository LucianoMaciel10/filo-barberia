import { Link } from "react-router-dom";
import { formatPrice } from "../utils/format";

function ServiceCard({ service }) {
  const { name, description, price, duration } = service;

  return (
    <article className="flex h-full flex-col rounded-brand border border-borde bg-white p-6 shadow-sm">
      <h3 className="text-2xl">{name}</h3>
      <p className="mt-3 text-sm text-charcoal/60">{description}</p>
      <p className="mt-4 mb-6 font-semibold">
        {formatPrice(price)} · {duration} min
      </p>

      <Link
        to={`/reservar/servicio?servicio=${service.id}`}
        className="mt-auto flex h-12 items-center justify-center rounded-brand border border-borde text-sm font-semibold transition-colors hover:border-dorado"
      >
        Elegir servicio
      </Link>
    </article>
  );
}

export default ServiceCard;
