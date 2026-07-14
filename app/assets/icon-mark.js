import { readFile } from "node:fs/promises";
import path from "node:path";

let fontCache;

export async function fuenteBaloo() {
  if (!fontCache) {
    fontCache = readFile(path.join(process.cwd(), "app/assets/baloo-800.ttf"));
  }
  return fontCache;
}

export function marcaJSX(size) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#E8572B",
        borderRadius: size * 0.22,
      }}
    >
      <span
        style={{
          fontFamily: "Baloo 2",
          fontSize: size * 0.58,
          color: "#FBF3E7",
          transform: `translateY(${size * 0.02}px)`,
        }}
      >
        L
      </span>
    </div>
  );
}
