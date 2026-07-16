"use client";

import { useEffect, useRef, useState } from "react";
import { useCurrentUser } from "@/lib/useCurrentUser";
import { useShoppingList } from "@/lib/useShoppingList";
import { CATEGORIAS } from "@/lib/categories";
import UserPicker from "@/components/UserPicker";
import TopBar from "@/components/TopBar";
import CategorySection from "@/components/CategorySection";
import AddItemSheet from "@/components/AddItemSheet";
import NotificacionesBoton from "@/components/NotificacionesBoton";
import Celebracion from "@/components/Celebracion";

const DURACION_CELEBRACION = 2200;

export default function Home() {
  const { usuario, cargando: cargandoUsuario, elegirUsuario, olvidarUsuario } =
    useCurrentUser();
  const { items, agregarItem, alternarComprado, vaciarComprados, editarItem } =
    useShoppingList();
  const [sheetAbierto, setSheetAbierto] = useState(false);
  const [itemEditando, setItemEditando] = useState(null);
  const [celebrando, setCelebrando] = useState(false);
  const marcandoUltimoRef = useRef(false);

  function cerrarSheet() {
    setSheetAbierto(false);
    setItemEditando(null);
  }

  function manejarAlternar(id) {
    const item = items.find((it) => it.id === id);
    if (item && !item.comprado) {
      const quedanOtrosPendientes = items.some(
        (it) => it.id !== id && !it.comprado
      );
      if (!quedanOtrosPendientes) marcandoUltimoRef.current = true;
    }
    alternarComprado(id, usuario);
  }

  useEffect(() => {
    if (items.length === 0) return;
    const todoComprado = items.every((it) => it.comprado);
    if (todoComprado && marcandoUltimoRef.current) {
      marcandoUltimoRef.current = false;
      setCelebrando(true);
      const timer = setTimeout(() => setCelebrando(false), DURACION_CELEBRACION);
      return () => clearTimeout(timer);
    }
    if (!todoComprado) {
      marcandoUltimoRef.current = false;
    }
  }, [items]);

  if (cargandoUsuario) return null;

  if (!usuario) {
    return <UserPicker onElegir={elegirUsuario} />;
  }

  const hayComprados = items.some((it) => it.comprado);

  return (
    <div className="pantalla-lista">
      <TopBar usuario={usuario} onCambiarUsuario={olvidarUsuario} />

      <div className="toolbar">
        <NotificacionesBoton usuario={usuario} />
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
            onAlternar={manejarAlternar}
            onEditar={setItemEditando}
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

      {(sheetAbierto || itemEditando) && (
        <AddItemSheet
          usuario={usuario}
          itemEditando={itemEditando}
          onAgregar={agregarItem}
          onEditar={editarItem}
          onCerrar={cerrarSheet}
        />
      )}

      <Celebracion visible={celebrando} />
    </div>
  );
}
