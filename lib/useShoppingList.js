"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "lista-compras:items";

function leerAlmacenados() {
  try {
    const crudo = localStorage.getItem(STORAGE_KEY);
    return crudo ? JSON.parse(crudo) : [];
  } catch {
    return [];
  }
}

export function useShoppingList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    setItems(leerAlmacenados());
    function onStorage(e) {
      if (e.key === STORAGE_KEY) setItems(leerAlmacenados());
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const guardar = useCallback((siguiente) => {
    setItems(siguiente);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(siguiente));
  }, []);

  const agregarItem = useCallback(
    ({ nombre, categoria, cantidad, unidad, pedidoPor }) => {
      const nuevo = {
        id: crypto.randomUUID(),
        nombre: nombre.trim(),
        categoria,
        cantidad,
        unidad,
        pedidoPor,
        comprado: false,
        creadoEn: Date.now(),
      };
      guardar([...(items ?? []), nuevo]);
    },
    [items, guardar]
  );

  const alternarComprado = useCallback(
    (id) => {
      guardar(
        (items ?? []).map((it) =>
          it.id === id ? { ...it, comprado: !it.comprado } : it
        )
      );
    },
    [items, guardar]
  );

  const vaciarComprados = useCallback(() => {
    guardar((items ?? []).filter((it) => !it.comprado));
  }, [items, guardar]);

  return {
    items: items ?? [],
    cargando: items === null,
    agregarItem,
    alternarComprado,
    vaciarComprados,
  };
}
