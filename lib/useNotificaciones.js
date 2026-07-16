"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const STORAGE_KEY = "lista-compras:notificaciones";

function soportado() {
  return (
    typeof window !== "undefined" &&
    "serviceWorker" in navigator &&
    "PushManager" in window &&
    "Notification" in window
  );
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; i++) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export function useNotificaciones(usuario) {
  const [activas, setActivas] = useState(false);
  const [activando, setActivando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setActivas(localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  const activar = useCallback(async () => {
    setError(null);
    if (!soportado()) {
      setError(
        "Este navegador no soporta notificaciones. En iPhone, primero agregá la app a la pantalla de inicio y abrila desde ahí."
      );
      return;
    }
    setActivando(true);
    try {
      const permiso = await Notification.requestPermission();
      if (permiso !== "granted") {
        setError("No diste el permiso de notificaciones.");
        return;
      }
      const registro = await navigator.serviceWorker.ready;
      const suscripcion = await registro.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
        ),
      });
      const datos = suscripcion.toJSON();
      const { error: dbError } = await supabase.from("push_subscriptions").upsert(
        {
          usuario,
          endpoint: datos.endpoint,
          p256dh: datos.keys.p256dh,
          auth: datos.keys.auth,
        },
        { onConflict: "endpoint" }
      );
      if (dbError) throw dbError;
      localStorage.setItem(STORAGE_KEY, "1");
      setActivas(true);
    } catch (e) {
      setError("No se pudo activar: " + e.message);
    } finally {
      setActivando(false);
    }
  }, [usuario]);

  return { activas, activando, error, activar, soportado: soportado() };
}
