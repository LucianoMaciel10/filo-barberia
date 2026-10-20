import { useNavigate } from "react-router-dom";
import BookingCalendar from "../../components/booking/BookingCalendar";
import BookingSummary from "../../components/booking/BookingSummary";
import StepActions from "../../components/booking/StepActions";
import TimeSlotPicker from "../../components/booking/TimeSlotPicker";
import { useBooking } from "../../hooks/useBooking";

function DateStep() {
  const { selection, service, barber, update } = useBooking();
  const navigate = useNavigate();

  const handleSelectDate = (date) => {
    // Si elige otro día, el horario anterior deja de valer
    update({
      date,
      time: date === selection.date ? selection.time : null,
    });
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1fr_20rem] lg:gap-8">
      <div className="space-y-6">
        <BookingCalendar
          selectedDate={selection.date}
          duration={service.duration}
          barberId={barber.id}
          onSelect={handleSelectDate}
        />
        <TimeSlotPicker
          date={selection.date}
          service={service}
          barber={barber}
          selectedTime={selection.time}
          onSelect={(time) => update({ time })}
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
