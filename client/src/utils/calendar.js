import { format, parseISO } from "date-fns";

const escapeText = (text) =>
  text.replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");

function toLocalStamp(dateKey, time, extraMinutes = 0) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = parseISO(dateKey);
  date.setHours(hours, minutes + extraMinutes, 0, 0);
  return format(date, "yyyyMMdd'T'HHmmss");
}

export function downloadIcs({
  id,
  title,
  description,
  location,
  date,
  time,
  duration,
}) {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Filo Barberia//Turnos//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${id}@filo-barberia`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toLocalStamp(date, time)}`,
    `DTEND:${toLocalStamp(date, time, duration)}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(location)}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT1H",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escapeText(title)}`,
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "turno-filo.ics";
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
