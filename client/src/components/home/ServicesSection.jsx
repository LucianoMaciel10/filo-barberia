import { services } from "../../data/services";
import ServiceCard from "../ServiceCard";

function ServicesSection() {
  return (
    <section
      id="servicios"
      className="scroll-mt-20 px-6 py-16 md:scroll-mt-24 md:py-20 xl:px-30"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-dorado-oscuro">
        El menú de Filo
      </p>
      <h2 className="mt-3 text-[32px] leading-tight md:text-[40px]">
        Bien hecho. A tu manera.
      </h2>
      <p className="mt-2 text-sm text-charcoal/60">
        Elegí tu servicio. Nosotros nos ocupamos del resto.
      </p>

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <li key={service.id}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-charcoal/60">
        Precios en pesos argentinos (ARS). Incluyen lavado y productos de
        terminación.
      </p>
    </section>
  );
}

export default ServicesSection;
