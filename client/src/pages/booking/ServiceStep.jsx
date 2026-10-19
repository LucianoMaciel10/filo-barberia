import { CircleCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BookingSummary from "../../components/booking/BookingSummary";
import { services } from "../../data/services";
import { useBooking } from "../../hooks/useBooking";
import { formatPrice } from "../../utils/format";
import StepActions from "../../components/booking/StepActions";

function ServiceStep() {
  const { selection, service, update } = useBooking();
  const navigate = useNavigate();

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
      <fieldset>
        <legend className="sr-only">Elegí tu servicio</legend>

        <div className="space-y-4">
          {services.map((item) => (
            <label
              key={item.id}
              className="flex cursor-pointer items-center gap-4 rounded-brand border-2 border-borde bg-white p-5 transition-colors hover:border-dorado has-checked:border-dorado has-checked:bg-dorado-suave has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-dorado"
            >
              <input
                type="radio"
                name="service"
                value={item.id}
                checked={selection.serviceId === item.id}
                onChange={() =>
                  update({ serviceId: item.id, date: null, time: null })
                }
                className="peer sr-only"
              />

              <span
                aria-hidden="true"
                className="size-5 shrink-0 rounded-full border-2 border-charcoal/30 peer-checked:hidden"
              />
              <CircleCheck
                aria-hidden="true"
                className="hidden size-5 shrink-0 text-dorado-oscuro peer-checked:block"
              />

              <span>
                <span className="block font-heading text-2xl">{item.name}</span>
                <span className="mt-1 block text-xs text-charcoal/60">
                  {item.duration} min · {item.description}
                </span>
                <span className="mt-2 block text-sm font-semibold">
                  {formatPrice(item.price)}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <BookingSummary>
        <StepActions
          canContinue={!!service}
          onContinue={() => navigate("/reservar/barbero")}
        />
      </BookingSummary>
    </div>
  );
}

export default ServiceStep;
