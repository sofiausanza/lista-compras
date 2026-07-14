import { ImageResponse } from "next/og";
import { fuenteBaloo, marcaJSX } from "./assets/icon-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const data = await fuenteBaloo();
  return new ImageResponse(marcaJSX(180), {
    ...size,
    fonts: [{ name: "Baloo 2", data, weight: 800, style: "normal" }],
  });
}
