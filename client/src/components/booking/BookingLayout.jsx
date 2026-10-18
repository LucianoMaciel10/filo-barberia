import { Outlet, useLocation } from "react-router-dom";
import { bookingSteps } from "../../data/bookingSteps";
import { BookingProvider } from "../../context/BookingProvider";
import BookingStepper from "./BookingStepper";

function BookingLayout() {
  const { pathname } = useLocation();
  const currentIndex = Math.max(
    0,
    bookingSteps.findIndex((step) => pathname.endsWith(step.path)),
  );
  const step = bookingSteps[currentIndex];

  return (
    <BookingProvider>
      <section className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
        <p className="text-xs font-bold uppercase tracking-wider text-dorado-oscuro">
          Reservá en Filo
        </p>
        <h1 className="mt-3 text-[32px] leading-tight md:text-[40px]">
          {step.title}
        </h1>
        <p className="mt-1 text-sm text-charcoal/60">{step.subtitle}</p>

        <BookingStepper steps={bookingSteps} current={currentIndex} />

        <div className="mt-8">
          <Outlet />
        </div>
      </section>
    </BookingProvider>
  );
}

export default BookingLayout;
