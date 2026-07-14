"use client";

import CheckIcon from "./CheckIcon";
import { emojiParaProducto } from "@/lib/emoji";
import { formatearCantidad } from "@/lib/format";

export default function ItemRow({ item, categoria, onAlternar }) {
  return (
    <button
      type="button"
      className={`item${item.comprado ? " comprado" : ""}`}
      onClick={() => onAlternar(item.id)}
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
