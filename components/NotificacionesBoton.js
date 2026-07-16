"use client";

import { useNotificaciones } from "@/lib/useNotificaciones";

export default function NotificacionesBoton({ usuario }) {
  const { activas, activando, error, activar } = useNotificaciones(usuario);

  if (activas) {
    return <span className="notif-estado">🔔 Avisos activados</span>;
  }

  return (
    <div className="notif-wrap">
      <button
        type="button"
        className="notif-boton"
        onClick={activar}
        disabled={activando}
      >
        🔔 {activando ? "Activando..." : "Activar avisos"}
      </button>
      {error && <span className="notif-error">{error}</span>}
    </div>
  );
}
