import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "El equipo", href: "#equipo" },
  { label: "La barbería", href: "#barberia" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const closeMenu = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-borde bg-fondo">
      <nav
        aria-label="Principal"
        className="flex h-20 items-center justify-between px-6 md:h-24 md:px-20"
      >
        <a href="#" onClick={closeMenu} aria-label="Filo Barbería, inicio">
          <Logo />
        </a>

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
            <a
              href="#"
              className="rounded-brand border border-borde bg-white px-5 py-3 text-sm font-semibold transition-colors hover:border-dorado"
            >
              Ingresá
            </a>
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
          className="absolute inset-x-0 top-full bg-charcoal px-6 py-8 text-fondo md:hidden"
        >
          <ul className="space-y-5 text-xl">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={closeMenu}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#"
            onClick={closeMenu}
            className="mt-8 block rounded-brand bg-dorado py-3 text-center font-semibold text-charcoal"
          >
            Ingresá
          </a>
        </div>
      )}
    </header>
  );
}

export default Navbar;
