"use client";

import { useState } from "react";
import { CATEGORIAS, esPorKilo } from "@/lib/categories";
import { formatearCantidad } from "@/lib/format";

function cantidadInicial(categoriaId) {
  return esPorKilo(categoriaId) ? 0.25 : 1;
}

export default function AddItemSheet({
  usuario,
  itemEditando,
  onAgregar,
  onEditar,
  onCerrar,
}) {
  const esEdicion = Boolean(itemEditando);
  const [nombre, setNombre] = useState(itemEditando?.nombre ?? "");
  const [categoriaId, setCategoriaId] = useState(
    itemEditando?.categoria ?? CATEGORIAS[0].id
  );
  const [cantidad, setCantidad] = useState(
    itemEditando?.cantidad ?? cantidadInicial(CATEGORIAS[0].id)
  );

  const porKilo = esPorKilo(categoriaId);
  const paso = porKilo ? 0.25 : 1;
  const minimo = porKilo ? 0.25 : 1;
  const unidad = porKilo ? "kg" : "u";

  function elegirCategoria(id) {
    setCategoriaId(id);
    setCantidad(cantidadInicial(id));
  }

  function sumar() {
    setCantidad((c) => Math.round((c + paso) * 100) / 100);
  }

  function restar() {
    setCantidad((c) => Math.max(minimo, Math.round((c - paso) * 100) / 100));
  }

  function enviar(e) {
    e.preventDefault();
    if (!nombre.trim()) return;
    if (esEdicion) {
      onEditar(itemEditando.id, {
        nombre: nombre.trim(),
        categoria: categoriaId,
        cantidad,
        unidad,
      });
    } else {
      onAgregar({
        nombre: nombre.trim(),
        categoria: categoriaId,
        cantidad,
        unidad,
        pedidoPor: usuario,
      });
    }
    onCerrar();
  }

  return (
    <div className="sheet-fondo" onClick={onCerrar}>
      <form
        className="sheet"
        onClick={(e) => e.stopPropagation()}
        onSubmit={enviar}
      >
        <div className="sheet-cabecera">
          <h2>{esEdicion ? "Editar producto" : "Agregar producto"}</h2>
          <button
            type="button"
            className="sheet-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <label className="campo-etiqueta" htmlFor="nombre-producto">
          {esEdicion ? "Nombre" : "¿Qué falta?"}
        </label>
        <input
          id="nombre-producto"
          className="campo-texto"
          type="text"
          placeholder="Ej: Leche"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          autoFocus
          maxLength={60}
        />

        <span className="campo-etiqueta">Categoría</span>
        <div className="chip-fila">
          {CATEGORIAS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`chip${categoriaId === cat.id ? " chip-activo" : ""}`}
              style={
                categoriaId === cat.id
                  ? { background: cat.color, color: "#fff" }
                  : { background: cat.colorFondo }
              }
              onClick={() => elegirCategoria(cat.id)}
            >
              <span>{cat.emoji}</span> {cat.nombre}
            </button>
          ))}
        </div>

        <span className="campo-etiqueta">Cantidad</span>
        <div className="stepper">
          <button
            type="button"
            className="stepper-boton"
            onClick={restar}
            aria-label="Restar"
          >
            −
          </button>
          <span className="stepper-valor">
            {formatearCantidad(cantidad, unidad)}
          </span>
          <button
            type="button"
            className="stepper-boton"
            onClick={sumar}
            aria-label="Sumar"
          >
            +
          </button>
        </div>

        <button type="submit" className="sheet-enviar" disabled={!nombre.trim()}>
          {esEdicion ? "Guardar cambios" : "Agregar a la lista"}
        </button>
      </form>
    </div>
  );
}
