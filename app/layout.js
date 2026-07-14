import { Baloo_2, Roboto } from "next/font/google";
import "./globals.css";
import RegistrarServiceWorker from "@/components/RegistrarServiceWorker";

const baloo = Baloo_2({
  variable: "--font-display",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-body",
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Lista de compras",
  description: "La lista de compras compartida de la familia",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lista de compras",
  },
};

export const viewport = {
  themeColor: "#E8572B",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-AR" className={`${baloo.variable} ${roboto.variable}`}>
      <body>
        {children}
        <RegistrarServiceWorker />
      </body>
    </html>
  );
}
