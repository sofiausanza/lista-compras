const formateadorKg = new Intl.NumberFormat("es-AR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export function formatearCantidad(cantidad, unidad) {
  if (unidad === "kg") {
    return `${formateadorKg.format(cantidad)} kg`;
  }
  return `x ${cantidad}`;
}
