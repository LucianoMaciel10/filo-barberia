import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { business } from "../../data/business";
import { Link } from "react-router-dom";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "El equipo", href: "#equipo" },
  { label: "La barbería", href: "#barberia" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-borde bg-fondo">
      <nav
        aria-label="Principal"
        className={`flex h-20 items-center justify-between px-6 md:h-24 md:px-20 ${
          open ? "bg-charcoal text-fondo" : "text-charcoal"
        }`}
      >
        <Link to="/" onClick={closeMenu} aria-label="Filo Barbería, inicio">
          <Logo />
        </Link>

        {/* Links desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm transition-colors hover:text-dorado"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              to="/login"
              className="rounded-brand border border-borde bg-white px-5 py-3 text-sm font-semibold transition-colors hover:border-dorado"
            >
              Ingresá
            </Link>
          </li>
        </ul>

        {/* Botón hamburguesa (mobile) */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="menu-mobile"
        >
          {open ? <X className="size-7" /> : <Menu className="size-7" />}
        </button>
      </nav>

      {/* Menú mobile */}
      {open && (
        <div
          id="menu-mobile"
          className="absolute inset-x-0 top-full flex h-[calc(100dvh-5rem)] flex-col overflow-y-auto bg-charcoal px-6 py-8 text-fondo md:hidden"
        >
          <ul className="space-y-5 font-heading text-3xl">
            {[{ label: "Inicio", href: "#" }, ...links].map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 space-y-3">
            <a
              href="#"
              onClick={closeMenu}
              className="block rounded-brand bg-dorado py-3 text-center text-sm font-semibold text-charcoal"
            >
              Reservar turno
            </a>
            <Link
              to="/login"
              onClick={closeMenu}
              className="block rounded-brand bg-dorado py-3 text-center text-sm font-semibold text-charcoal"
            >
              Ingresá a tu cuenta
            </Link>
          </div>

          <div className="mt-auto space-y-4 border-t border-fondo/15 pt-6 text-sm">
            <p>
              {business.address}, {business.neighborhood} · {business.city}
            </p>

            <ul className="space-y-1 text-fondo/70">
              {business.hours.map(({ days, time }) => (
                <li key={days}>
                  {days} · {time}
                </li>
              ))}
            </ul>

            <ul className="flex gap-3 text-dorado">
              {business.socials.map((social, index) => (
                <li key={social.label} className="flex gap-3">
                  {index > 0 && <span aria-hidden="true">·</span>}
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
