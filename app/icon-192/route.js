import { ImageResponse } from "next/og";
import { marcaJSX } from "../assets/icon-mark";

export async function GET() {
  return new ImageResponse(marcaJSX(192), { width: 192, height: 192 });
}
