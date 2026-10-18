export function formatPrice(amount) {
  return `$ ${new Intl.NumberFormat("es-AR").format(amount)}`;
}

export function shortName(fullName) {
  const [first, ...rest] = fullName.trim().split(/\s+/);
  const lastInitial = rest.length ? ` ${rest[rest.length - 1][0]}.` : "";
  return `${first}${lastInitial}`;
}
