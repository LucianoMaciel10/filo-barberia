import nicolas from "../assets/barbers/nicolas-rios.png";
import mateo from "../assets/barbers/mateo-suarez.png";
import lucia from "../assets/barbers/lucia-torres.png";

export const barbers = [
  {
    id: "nicolas-rios",
    name: "Nicolás Ríos",
    specialty: "Degradados y barba",
    photo: nicolas,
  },
  {
    id: "mateo-suarez",
    name: "Mateo Suárez",
    specialty: "Clásicos y tijera",
    photo: mateo,
  },
  {
    id: "lucia-torres",
    name: "Lucía Torres",
    specialty: "Textura y estilo",
    photo: lucia,
  },
];

export const ANY_BARBER_ID = "cualquiera";

export const anyBarber = {
  id: ANY_BARBER_ID,
  name: "Cualquiera",
  specialty: "El primer barbero disponible. Mismo cuidado, menos espera.",
};

export const getBarberLabel = (barber) =>
  barber.id === ANY_BARBER_ID ? "Primer barbero disponible" : barber.name;

export const getBarberById = (id) =>
  [anyBarber, ...barbers].find((barber) => barber.id === id) ?? null;
