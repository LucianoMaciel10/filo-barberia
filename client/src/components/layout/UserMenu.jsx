import { useEffect, useRef, useState } from "react";
import { ChevronDown, LayoutDashboard, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { shortName } from "../../utils/format";

function UserMenu() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleLogout = () => {
    setOpen(false);
    logout();
    navigate("/");
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="user-menu"
        className="flex h-12 cursor-pointer items-center gap-2 rounded-brand border border-borde bg-white px-4 text-sm font-semibold transition-colors hover:border-dorado"
      >
        <User className="size-4" aria-hidden="true" />
        {shortName(user.name)}
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          id="user-menu"
          className="absolute right-0 top-full mt-2 w-48 rounded-brand border border-borde bg-white p-1 text-sm shadow-lg"
        >
          {user.role === "admin" && (
            <li>
              <Link
                to="/admin"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors hover:bg-arena"
              >
                <LayoutDashboard className="size-4" aria-hidden="true" />
                Panel de administración
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/perfil"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 transition-colors hover:bg-arena"
            >
              <User className="size-4" aria-hidden="true" />
              Mi perfil
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={handleLogout}
              className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2.5 text-left text-cancelado transition-colors hover:bg-cancelado-suave"
            >
              <LogOut className="size-4" aria-hidden="true" />
              Cerrar sesión
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
