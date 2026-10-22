import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingContext } from "./booking-context";
import { getServiceById, services } from "../data/services";
import { getBarberById } from "../data/barbers";

const emptySelection = {
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
};

export function BookingProvider({ children }) {
  const [searchParams] = useSearchParams();

  // Si viene ?servicio=corte-clasico (desde la landing), arranca preseleccionado
  const [selection, setSelection] = useState(() => {
    const fromUrl = searchParams.get("servicio");
    const isValid = services.some((s) => s.id === fromUrl);
    return { ...emptySelection, serviceId: isValid ? fromUrl : null };
  });

  const update = (changes) => setSelection((prev) => ({ ...prev, ...changes }));
  const reset = () => setSelection(emptySelection);

  const service = getServiceById(selection.serviceId);

  const barber = getBarberById(selection.barberId);

  return (
    <BookingContext.Provider
      value={{ selection, service, barber, update, reset }}
    >
      {children}
    </BookingContext.Provider>
  );
}
