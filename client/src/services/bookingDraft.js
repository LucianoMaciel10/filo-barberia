const KEY = "filo-booking-draft";

export function readBookingDraft() {
  try {
    return JSON.parse(sessionStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function writeBookingDraft(selection) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(selection));
  } catch {
    // ignorar
  }
}

export function clearBookingDraft() {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // ignorar
  }
}
