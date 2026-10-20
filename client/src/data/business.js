export const business = {
  name: "Filo Barbería",
  neighborhood: "Palermo",
  city: "Buenos Aires",
  address: "Gorriti 4820",
  foundedYear: 2018,
  hours: [
    { days: "Lun a vie", time: "10:00 a 20:00" },
    { days: "Sábados", time: "10:00 a 18:00" },
    { days: "Domingos", time: "Cerrado" },
  ],
  socials: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "WhatsApp", href: "https://wa.me/5491122334455" },
  ],
  phone: "+5491155554820",
  phoneDisplay: "+54 9 11 5555-4820",
  schedule: {
    0: null, // domingo cerrado
    1: { open: "10:00", close: "20:00" },
    2: { open: "10:00", close: "20:00" },
    3: { open: "10:00", close: "20:00" },
    4: { open: "10:00", close: "20:00" },
    5: { open: "10:00", close: "20:00" },
    6: { open: "10:00", close: "18:00" },
  },
};
