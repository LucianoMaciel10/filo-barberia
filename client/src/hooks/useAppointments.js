import { useState } from "react";
import { cancelAppointment, getAppointments } from "../services/appointments";
import { useAuth } from "./useAuth";

export function useAppointments() {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState(() =>
    getAppointments(user.email),
  );

  const cancel = async (id) => {
    await cancelAppointment(id);
    setAppointments(getAppointments(user.email));
  };

  return { appointments, cancel };
}
