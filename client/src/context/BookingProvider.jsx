import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { BookingContext } from "./booking-context";
import { getBarberById } from "../data/barbers";
import { getServiceById } from "../data/services";
import {
  clearBookingDraft,
  readBookingDraft,
  writeBookingDraft,
} from "../services/bookingDraft";

const emptySelection = {
  serviceId: null,
  barberId: null,
  date: null,
  time: null,
};

export function BookingProvider({ children }) {
  const [searchParams] = useSearchParams();

  const [selection, setSelection] = useState(() => {
    // Si viene ?servicio=... (desde la landing o "Volver a reservar"), arranca de cero con ese servicio
    const fromUrl = searchParams.get("servicio");
    if (getServiceById(fromUrl))
      return { ...emptySelection, serviceId: fromUrl };

    return readBookingDraft() ?? emptySelection;
  });

  useEffect(() => {
    writeBookingDraft(selection);
  }, [selection]);

  const update = (changes) => setSelection((prev) => ({ ...prev, ...changes }));

  const reset = () => {
    setSelection(emptySelection);
    clearBookingDraft();
  };

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
