"use client";

import { useRef, useState } from "react";
import CheckIcon from "./CheckIcon";
import { emojiParaProducto } from "@/lib/emoji";
import { formatearCantidad } from "@/lib/format";

const DURACION_PULSACION = 500;

export default function ItemRow({ item, categoria, onAlternar, onEditar }) {
  const timerRef = useRef(null);
  const disparoEdicion = useRef(false);
  const [presionando, setPresionando] = useState(false);

  function iniciarPulsacion() {
    disparoEdicion.current = false;
    setPresionando(true);
    timerRef.current = setTimeout(() => {
      disparoEdicion.current = true;
      setPresionando(false);
      onEditar(item);
    }, DURACION_PULSACION);
  }

  function cancelarPulsacion() {
    clearTimeout(timerRef.current);
    setPresionando(false);
  }

  function alClick() {
    if (disparoEdicion.current) {
      disparoEdicion.current = false;
      return;
    }
    onAlternar(item.id);
  }

  return (
    <button
      type="button"
      className={`item${item.comprado ? " comprado" : ""}${
        presionando ? " presionando" : ""
      }`}
      onClick={alClick}
      onPointerDown={iniciarPulsacion}
      onPointerUp={cancelarPulsacion}
      onPointerLeave={cancelarPulsacion}
      onPointerCancel={cancelarPulsacion}
      aria-pressed={item.comprado}
    >
      <span className="check">
        <CheckIcon />
      </span>
      <span className="item-emoji">{emojiParaProducto(item.nombre, categoria)}</span>
      <span className="item-info">
        <span className="item-nombre">{item.nombre}</span>
        <span className="item-meta">pidió {item.pedidoPor}</span>
      </span>
      <span className="item-cantidad">
        {formatearCantidad(item.cantidad, item.unidad)}
      </span>
    </button>
  );
}
