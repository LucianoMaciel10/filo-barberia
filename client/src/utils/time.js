const pad = (n) => String(n).padStart(2, "0");

// "16:30" → 990
export function toMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// 990 → "16:30"
export const toTime = (minutes) =>
  `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`;
