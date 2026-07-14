import { ImageResponse } from "next/og";
import { fuenteBaloo, marcaJSX } from "../assets/icon-mark";

export async function GET() {
  const data = await fuenteBaloo();
  return new ImageResponse(marcaJSX(512), {
    width: 512,
    height: 512,
    fonts: [{ name: "Baloo 2", data, weight: 800, style: "normal" }],
  });
}
