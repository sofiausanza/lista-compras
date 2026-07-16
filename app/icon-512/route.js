import { ImageResponse } from "next/og";
import { marcaJSX } from "../assets/icon-mark";

export async function GET() {
  return new ImageResponse(marcaJSX(512), { width: 512, height: 512 });
}
