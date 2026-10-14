import { barbers } from "../../data/barbers";
import BarberCard from "../BarberCard";

function TeamSection() {
  return (
    <section
      id="equipo"
      className="scroll-mt-20 px-6 py-16 md:scroll-mt-24 md:py-20 xl:px-30"
    >
      <p className="text-xs font-bold uppercase tracking-wider text-dorado-oscuro">
        Conocé a tu barbero
      </p>
      <h2 className="mt-3 text-[32px] leading-tight md:text-[40px]">
        Buenas manos. Buena onda.
      </h2>
      <p className="mt-2 text-sm text-charcoal/60">
        Personas que disfrutan de su oficio y se toman el tiempo de escucharte.
      </p>

      <ul className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
        {barbers.map((barber) => (
          <li key={barber.id}>
            <BarberCard barber={barber} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TeamSection;
