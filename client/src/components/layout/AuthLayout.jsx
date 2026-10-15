import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import authImg from "../../assets/auth-barberia.png";

function AuthLayout({ children }) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-[4fr_5fr]">
      {/* Panel de imagen */}
      <aside className="relative h-62 lg:h-auto">
        <img
          src={authImg}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-charcoal/80 via-charcoal/10 to-charcoal/30" />

        <div className="relative flex h-full flex-col justify-between p-6 text-fondo lg:p-10">
          <Link to="/" aria-label="Filo Barbería, inicio" className="w-fit">
            <Logo />
          </Link>

          <div>
            <p className="font-heading leading-tight text-[26px] sm:text-[32px] md:text-[38px] lg:text-5xl">
              El próximo buen corte empieza con vos
            </p>
            <p className="mt-3 hidden text-sm lg:block text-white/80">
              Reservá, elegí a tu barbero y manejá tus turnos desde un solo lugar
            </p>
          </div>
        </div>
      </aside>

      {/* Panel del formulario */}
      <main className="flex flex-col px-6 py-8 lg:px-20 lg:py-12">
        <div className="mx-auto flex w-full max-w-xl my-auto flex-col">
          <Link
            to="/"
            className="inline-flex w-fit items-center gap-2 text-sm transition-colors hover:text-dorado"
          >
            <ArrowLeft className="size-6" aria-hidden="true" />
            Volver a Filo
          </Link>

          <div className="my-auto py-10">{children}</div>
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
