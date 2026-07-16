"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

function filaAItem(fila) {
  return {
    id: fila.id,
    nombre: fila.nombre,
    categoria: fila.categoria,
    cantidad: Number(fila.cantidad),
    unidad: fila.unidad,
    pedidoPor: fila.pedido_por,
    comprado: fila.comprado,
    marcadoPor: fila.marcado_por,
    creadoEn: fila.creado_en,
  };
}

export function useShoppingList() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    let activo = true;

    supabase
      .from("items")
      .select("*")
      .order("creado_en", { ascending: true })
      .then(({ data, error }) => {
        if (!activo) return;
        if (error) {
          console.error("No se pudo cargar la lista:", error.message);
          setItems([]);
          return;
        }
        setItems(data.map(filaAItem));
      });

    const canal = supabase
      .channel("items-cambios")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "items" },
        (payload) => {
          setItems((actual) => {
            const lista = actual ?? [];
            if (payload.eventType === "INSERT") {
              if (lista.some((it) => it.id === payload.new.id)) return lista;
              return [...lista, filaAItem(payload.new)];
            }
            if (payload.eventType === "UPDATE") {
              return lista.map((it) =>
                it.id === payload.new.id ? filaAItem(payload.new) : it
              );
            }
            if (payload.eventType === "DELETE") {
              return lista.filter((it) => it.id !== payload.old.id);
            }
            return lista;
          });
        }
      )
      .subscribe();

    return () => {
      activo = false;
      supabase.removeChannel(canal);
    };
  }, []);

  const agregarItem = useCallback(
    async ({ nombre, categoria, cantidad, unidad, pedidoPor }) => {
      const { error } = await supabase.from("items").insert({
        nombre: nombre.trim(),
        categoria,
        cantidad,
        unidad,
        pedido_por: pedidoPor,
      });
      if (error) console.error("No se pudo agregar el producto:", error.message);
    },
    []
  );

  const alternarComprado = useCallback(
    async (id, usuario) => {
      const item = (items ?? []).find((it) => it.id === id);
      if (!item) return;
      const marcando = !item.comprado;
      const { error } = await supabase
        .from("items")
        .update({ comprado: marcando, marcado_por: marcando ? usuario : null })
        .eq("id", id);
      if (error) console.error("No se pudo actualizar el producto:", error.message);
    },
    [items]
  );

  const vaciarComprados = useCallback(async () => {
    const { error } = await supabase.from("items").delete().eq("comprado", true);
    if (error) console.error("No se pudo vaciar la lista:", error.message);
  }, []);

  const editarItem = useCallback(
    async (id, { nombre, categoria, cantidad, unidad }) => {
      const { error } = await supabase
        .from("items")
        .update({ nombre: nombre.trim(), categoria, cantidad, unidad })
        .eq("id", id);
      if (error) console.error("No se pudo editar el producto:", error.message);
    },
    []
  );

  return {
    items: items ?? [],
    cargando: items === null,
    agregarItem,
    alternarComprado,
    vaciarComprados,
    editarItem,
  };
}
