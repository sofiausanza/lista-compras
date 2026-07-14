"use client";

import { FAMILIA } from "@/lib/categories";

const COLORES = {
  Roxy: { fondo: "var(--lacteos-bg)", marca: "var(--lacteos)" },
  Sofi: { fondo: "var(--verduleria-bg)", marca: "var(--verduleria)" },
  Valen: { fondo: "var(--limpieza-bg)", marca: "var(--limpieza)" },
  Alito: { fondo: "var(--carniceria-bg)", marca: "var(--carniceria)" },
};

export default function UserPicker({ onElegir }) {
  return (
    <div className="pantalla-select">
      <div className="select-titulo">¿Quién sos?</div>
      <p className="select-subtitulo">
        Tocá tu nombre. Después no te lo va a volver a preguntar.
      </p>
      <div className="user-grid">
        {FAMILIA.map((nombre) => (
          <button
            key={nombre}
            type="button"
            className="user-boton"
            style={{ background: COLORES[nombre].fondo }}
            onClick={() => onElegir(nombre)}
          >
            <span
              className="user-avatar"
              style={{ background: COLORES[nombre].marca }}
            >
              {nombre[0]}
            </span>
            {nombre}
          </button>
        ))}
      </div>
    </div>
  );
}

export { COLORES as COLORES_FAMILIA };
