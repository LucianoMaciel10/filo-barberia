export function formatPrice(amount) {
  return `$ ${new Intl.NumberFormat("es-AR").format(amount)}`;
}
