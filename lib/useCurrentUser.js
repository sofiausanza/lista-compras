"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "lista-compras:usuario";

export function useCurrentUser() {
  const [usuario, setUsuarioState] = useState(undefined);

  useEffect(() => {
    setUsuarioState(localStorage.getItem(STORAGE_KEY) || null);
  }, []);

  function elegirUsuario(nombre) {
    localStorage.setItem(STORAGE_KEY, nombre);
    setUsuarioState(nombre);
  }

  function olvidarUsuario() {
    localStorage.removeItem(STORAGE_KEY);
    setUsuarioState(null);
  }

  return { usuario, cargando: usuario === undefined, elegirUsuario, olvidarUsuario };
}
