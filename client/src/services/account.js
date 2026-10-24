const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// TODO: reemplazar por llamadas a la API cuando esté el backend
export async function updateProfile(changes) {
  await delay(600);
  return changes;
}

export async function changePassword() {
  await delay(700);
}
