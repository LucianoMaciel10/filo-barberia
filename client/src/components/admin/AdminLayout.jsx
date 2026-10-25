import { ArrowUpRight } from "lucide-react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import Logo from "../layout/Logo";
import { useAuth } from "../../hooks/useAuth";

const links = [
  { label: "Resumen", to: "/admin", end: true },
  { label: "Agenda", to: "/admin/agenda" },
  { label: "Turnos", to: "/admin/turnos" },
  { label: "Servicios", to: "/admin/servicios" },
  { label: "Barberos", to: "/admin/barberos" },
  { label: "Clientes", to: "/admin/clientes" },
];

function AdminAccount({ className = "" }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className={`text-xs ${className}`}>
      <p className="font-semibold">{user.name}</p>
      <p className="mt-0.5 opacity-70">Administración</p>
      <p className="mt-3 flex items-center gap-2 text-dorado-oscuro lg:text-dorado">
        <Link to="/" className="inline-flex items-center gap-1 hover:underline">
          Ver sitio <ArrowUpRight className="size-3" aria-hidden="true" />
        </Link>
        <span aria-hidden="true">·</span>
        <button
          type="button"
          onClick={handleLogout}
          className="cursor-pointer hover:underline"
        >
          Salir
        </button>
      </p>
    </div>
  );
}

function AdminLayout() {
  return (
    <div className="min-h-dvh lg:flex">
      <aside className="border-b border-borde bg-fondo lg:sticky lg:top-0 lg:flex lg:h-dvh lg:w-60 lg:shrink-0 lg:flex-col lg:border-b-0 lg:bg-charcoal lg:px-8 lg:py-8 lg:text-fondo">
        <div className="flex items-center justify-between px-6 pt-4 lg:block lg:px-0 lg:pt-0">
          <Link to="/admin" aria-label="Filo Barbería, resumen del panel">
            <Logo />
          </Link>
          <span className="text-xs text-charcoal/60 lg:hidden">
            Administración
          </span>
        </div>

        <nav
          aria-label="Administración"
          className="mt-2 overflow-x-auto px-3 pb-2 lg:mt-12 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          <ul className="flex gap-1 lg:flex-col lg:gap-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `flex items-center whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors lg:px-0 ${
                      isActive
                        ? "font-semibold text-dorado-oscuro lg:text-dorado"
                        : "text-charcoal/70 hover:text-dorado-oscuro lg:text-fondo/80 lg:hover:text-dorado"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span aria-hidden="true" className="hidden w-5 lg:inline">
                        {isActive ? "—" : ""}
                      </span>
                      {link.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <AdminAccount className="mt-auto hidden lg:block" />
      </aside>

      <div className="min-w-0 flex-1">
        <main className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-10 lg:py-10">
          <Outlet />
        </main>
        <AdminAccount className="border-t border-borde px-6 py-6 lg:hidden" />
      </div>
    </div>
  );
}

export default AdminLayout;
