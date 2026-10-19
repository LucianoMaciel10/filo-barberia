import { CircleCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingSummary from "../../components/booking/BookingSummary";
import StepActions from "../../components/booking/StepActions";
import { anyBarber, barbers } from "../../data/barbers";
import { useBooking } from "../../hooks/useBooking";

const options = [anyBarber, ...barbers];

function BarberStep() {
  const { selection, barber, update } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
      <fieldset>
        <legend className="sr-only">Elegí tu barbero</legend>

        <div className="space-y-4">
          {options.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-4 rounded-brand border-2 border-borde bg-white p-4 transition-colors hover:border-dorado has-checked:border-dorado has-checked:bg-dorado-suave has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-dorado"
            >
              <input
                type="radio"
                name="barber"
                value={item.id}
                checked={selection.barberId === item.id}
                onChange={() =>
                  update({ barberId: item.id, date: null, time: null })
                }
                className="peer sr-only"
              />

              {item.photo ? (
                <img
                  src={item.photo}
                  alt=""
                  width="64"
                  height="64"
                  className="size-16 shrink-0 rounded-xl object-cover"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex w-16 shrink-0 justify-center text-dorado"
                >
                  <Users className="size-6" />
                </span>
              )}

              <span className="min-w-0">
                <span className="block font-heading text-2xl">{item.name}</span>
                <span className="mt-1 block text-xs text-charcoal/60">
                  {item.specialty}
                </span>
              </span>

              <span
                aria-hidden="true"
                className="ml-auto size-5 shrink-0 rounded-full border-2 border-charcoal/30 peer-checked:hidden"
              />
              <CircleCheck
                aria-hidden="true"
                className="ml-auto hidden size-5 shrink-0 text-dorado-oscuro peer-checked:block"
              />
            </label>
          ))}
        </div>
      </fieldset>

      <BookingSummary>
        <StepActions
          canContinue={!!barber}
          onContinue={() => navigate("/reservar/fecha")}
          backTo="/reservar/servicio"
        />
      </BookingSummary>
    </div>
  );
}

export default BarberStep;
