import { useNavigate } from "react-router-dom";
import BookingCalendar from "../../components/booking/BookingCalendar";
import BookingSummary from "../../components/booking/BookingSummary";
import StepActions from "../../components/booking/StepActions";
import TimeSlotPicker from "../../components/booking/TimeSlotPicker";
import { useBooking } from "../../hooks/useBooking";
import { getDefaultDate } from "../../services/availability";

function DateStep() {
  const { selection, service, barber, update } = useBooking();
  const navigate = useNavigate();

  // Si todavía no eligió un día, se muestra el primero disponible (normalmente hoy)
  const date = selection.date ?? getDefaultDate(service.duration, barber.id);

  const handleSelectDate = (newDate) => {
    // Si elige otro día, el horario anterior deja de valer
    update({
      date: newDate,
      time: newDate === selection.date ? selection.time : null,
    });
  };

  // Al elegir horario se guarda también el día, por si era el propuesto
  const handleSelectTime = (time) => update({ date, time });

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
      <div className="space-y-6">
        <BookingCalendar
          selectedDate={date}
          duration={service.duration}
          barberId={barber.id}
          onSelect={handleSelectDate}
        />
        <TimeSlotPicker
          date={date}
          service={service}
          barber={barber}
          selectedTime={selection.time}
          onSelect={handleSelectTime}
        />
      </div>

      <BookingSummary>
        <StepActions
          canContinue={!!(selection.date && selection.time)}
          onContinue={() => navigate("/reservar/resumen")}
          backTo="/reservar/barbero"
        />
      </BookingSummary>
    </div>
  );
}

export default DateStep;
