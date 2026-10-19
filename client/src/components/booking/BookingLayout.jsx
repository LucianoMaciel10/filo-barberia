import { Navigate, Outlet, useLocation } from "react-router-dom";
import { BookingProvider } from "../../context/BookingProvider";
import { bookingSteps, getReachableStep } from "../../data/bookingSteps";
import { useBooking } from "../../hooks/useBooking";
import BookingStepper from "./BookingStepper";

function BookingFlow() {
  const { pathname } = useLocation();
  const { selection } = useBooking();

  const currentIndex = Math.max(
    0,
    bookingSteps.findIndex((step) => pathname.endsWith(step.path)),
  );
  const reachable = getReachableStep(selection);

  // Si intenta entrar a un paso sin completar los anteriores, lo devolvemos
  if (currentIndex > reachable) {
    return (
      <Navigate to={`/reservar/${bookingSteps[reachable].path}`} replace />
    );
  }

  const step = bookingSteps[currentIndex];

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <p className="text-xs font-bold uppercase tracking-wider text-dorado-oscuro">
        Reservá en Filo
      </p>
      <h1 className="mt-3 text-[32px] leading-tight md:text-[40px]">
        {step.title}
      </h1>
      <p className="mt-1 text-sm text-charcoal/60">{step.subtitle}</p>

      <BookingStepper
        steps={bookingSteps}
        current={currentIndex}
        reachable={reachable}
      />

      <div className="mt-8">
        <Outlet />
      </div>
    </section>
  );
}

function BookingLayout() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  );
}

export default BookingLayout;
