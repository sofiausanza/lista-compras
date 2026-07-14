"use client";

import { useState } from "react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { useShoppingList } from "@/lib/useShoppingList";
import { CATEGORIAS } from "@/lib/categories";
import UserPicker from "@/components/UserPicker";
import TopBar from "@/components/TopBar";
import CategorySection from "@/components/CategorySection";
import AddItemSheet from "@/components/AddItemSheet";

export default function Home() {
  const { usuario, cargando: cargandoUsuario, elegirUsuario, olvidarUsuario } =
    useCurrentUser();
  const { items, agregarItem, alternarComprado, vaciarComprados } =
    useShoppingList();
  const [sheetAbierto, setSheetAbierto] = useState(false);

  if (cargandoUsuario) return null;

  if (!usuario) {
    return <UserPicker onElegir={elegirUsuario} />;
  }

  const hayComprados = items.some((it) => it.comprado);

  return (
    <div className="pantalla-lista">
      <TopBar usuario={usuario} onCambiarUsuario={olvidarUsuario} />

      <div className="toolbar">
        <button
          type="button"
          className="vaciar-boton"
          onClick={vaciarComprados}
          disabled={!hayComprados}
          style={{ visibility: hayComprados ? "visible" : "hidden" }}
        >
          🗑 Vaciar comprados
        </button>
      </div>

      <div className="lista-scroll">
        {items.length === 0 && (
          <p className="lista-vacia">
            No hay nada en la lista todavía.
            <br />
            Tocá el botón + para agregar el primer producto.
          </p>
        )}
        {CATEGORIAS.map((categoria) => (
          <CategorySection
            key={categoria.id}
            categoria={categoria}
            items={items.filter((it) => it.categoria === categoria.id)}
            onAlternar={alternarComprado}
          />
        ))}
      </div>

      <button
        type="button"
        className="fab"
        onClick={() => setSheetAbierto(true)}
        aria-label="Agregar producto"
      >
        +
      </button>

      {sheetAbierto && (
        <AddItemSheet
          usuario={usuario}
          onAgregar={agregarItem}
          onCerrar={() => setSheetAbierto(false)}
        />
      )}
    </div>
  );
}
