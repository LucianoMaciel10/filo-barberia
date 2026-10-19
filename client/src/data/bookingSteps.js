export const bookingSteps = [
  {
    path: "servicio",
    label: "Servicio",
    title: "Elegí tu servicio.",
    subtitle: "Un buen corte empieza con una buena elección.",
  },
  {
    path: "barbero",
    label: "Barbero",
    title: "¿Con quién te cortás?",
    subtitle: "Elegí a tu barbero de confianza o dejalo en nuestras manos.",
  },
  {
    path: "fecha",
    label: "Fecha y hora",
    title: "Encontrá tu momento.",
    subtitle: "Elegí el día y el horario que mejor te quede.",
  },
  {
    path: "resumen",
    label: "Resumen",
    title: "Todo listo para reservar.",
    subtitle: "Revisá los datos antes de confirmar tu turno.",
  },
];

// Índice del primer paso incompleto: hasta ahí se puede navegar
export function getReachableStep(selection) {
  if (!selection.serviceId) return 0;
  if (!selection.barberId) return 1;
  if (!selection.date || !selection.time) return 2;
  return 3;
}