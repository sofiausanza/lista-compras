export const FAMILIA = ["Roxy", "Sofi", "Valen", "Alito"];

export const CATEGORIAS = [
  {
    id: "lacteos",
    nombre: "Lácteos",
    emoji: "🥛",
    unidad: "u",
    color: "var(--lacteos)",
    colorFondo: "var(--lacteos-bg)",
  },
  {
    id: "verduleria",
    nombre: "Verdulería",
    emoji: "🥕",
    unidad: "kg",
    color: "var(--verduleria)",
    colorFondo: "var(--verduleria-bg)",
  },
  {
    id: "carniceria",
    nombre: "Carnicería",
    emoji: "🥩",
    unidad: "kg",
    color: "var(--carniceria)",
    colorFondo: "var(--carniceria-bg)",
  },
  {
    id: "almacen",
    nombre: "Almacén",
    emoji: "🛒",
    unidad: "u",
    color: "var(--almacen)",
    colorFondo: "var(--almacen-bg)",
  },
  {
    id: "limpieza",
    nombre: "Limpieza",
    emoji: "🧽",
    unidad: "u",
    color: "var(--limpieza)",
    colorFondo: "var(--limpieza-bg)",
  },
];

export function categoriaPorId(id) {
  return CATEGORIAS.find((c) => c.id === id) ?? CATEGORIAS[0];
}

export function esPorKilo(categoriaId) {
  return categoriaPorId(categoriaId).unidad === "kg";
}
