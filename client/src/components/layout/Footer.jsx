import Logo from "./Logo";
import { business } from "../../data/business";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal px-6 py-10 text-fondo md:px-20 md:py-12">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-3 md:items-start">
        <Logo />

        <p className="text-sm md:text-center">
          Hecho con oficio. Pensado para vos.
        </p>

        <ul className="flex items-center gap-3 text-sm md:justify-end">
          {business.socials.map((social, index) => (
            <li key={social.label} className="flex items-center gap-3">
              {index > 0 && <span aria-hidden="true">·</span>}
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-dorado"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-8 text-xs text-fondo/60">
        © {year} {business.name} ·{" "}
        <a href="#" className="hover:text-fondo">
          Privacidad
        </a>{" "}
        ·{" "}
        <a href="#" className="hover:text-fondo">
          Términos y condiciones
        </a>
      </p>
    </footer>
  );
}

export default Footer;
