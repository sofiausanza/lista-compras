"use client";

export default function TopBar({ usuario, onCambiarUsuario }) {
  return (
    <div className="topbar">
      <h1>Lista de compras</h1>
      <button
        type="button"
        className="avatar-chip"
        onClick={onCambiarUsuario}
        aria-label="Cambiar de usuario"
      >
        <span className="user-avatar">{usuario?.[0] ?? "?"}</span>
        <span>cambiar</span>
      </button>
    </div>
  );
}
