import { CalendarCheck, Scissors, ShieldCheck } from "lucide-react";

const highlights = [
  { icon: CalendarCheck, text: "Reservá en unos minutos" },
  { icon: Scissors, text: "Barberos con oficio" },
  { icon: ShieldCheck, text: "Vení por el corte. Quedate por el momento." },
];

function Highlights() {
  return (
    <section aria-label="Por qué elegirnos">
      <ul className="flex flex-col gap-4 border-t border-borde py-6 md:flex-row md:items-center md:justify-between">
        {highlights.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 text-sm">
            <Icon className="size-5 shrink-0 text-dorado" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Highlights;
