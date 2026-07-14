export default function manifest() {
  return {
    name: "Lista de compras",
    short_name: "Compras",
    description: "La lista de compras compartida de la familia",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF3E7",
    theme_color: "#E8572B",
    lang: "es-AR",
    icons: [
      { src: "/icon-192", sizes: "192x192", type: "image/png" },
      { src: "/icon-512", sizes: "512x512", type: "image/png" },
    ],
  };
}
