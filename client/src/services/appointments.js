// TODO: reemplazar por un POST a la API cuando esté el backend
export async function createAppointment({ selection, user }) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return {
    id: `apt_${Date.now().toString(36)}`,
    ...selection, // serviceId, barberId, date, time
    userEmail: user.email,
    status: "confirmed",
  };
}
