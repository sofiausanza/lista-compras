import { ImageResponse } from "next/og";
import { fuenteBaloo, marcaJSX } from "./assets/icon-mark";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const data = await fuenteBaloo();
  return new ImageResponse(marcaJSX(32), {
    ...size,
    fonts: [{ name: "Baloo 2", data, weight: 800, style: "normal" }],
  });
}
