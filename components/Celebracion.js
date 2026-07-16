"use client";

export default function Celebracion({ visible }) {
  return (
    <div className={`celebracion-fondo${visible ? " activa" : ""}`}>
      <div className="celebracion-tarjeta">
        <span className="celebracion-emoji">🛒✅</span>
        <div className="celebracion-titulo">¡Compraste todo!</div>
        <div className="celebracion-sub">No queda nada pendiente</div>
      </div>
    </div>
  );
}
