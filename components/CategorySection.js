"use client";

import ItemRow from "./ItemRow";

export default function CategorySection({ categoria, items, onAlternar, onEditar }) {
  if (items.length === 0) return null;

  return (
    <div className="categoria">
      <div className="categoria-header" style={{ background: categoria.color }}>
        <span>{categoria.emoji}</span>
        <span>{categoria.nombre}</span>
      </div>
      <div className="categoria-cuerpo" style={{ background: categoria.colorFondo }}>
        {items.map((item) => (
          <ItemRow
            key={item.id}
            item={item}
            categoria={categoria}
            onAlternar={onAlternar}
            onEditar={onEditar}
          />
        ))}
      </div>
    </div>
  );
}
