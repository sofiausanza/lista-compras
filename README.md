# Lista de compras

App web de lista de compras compartida para la familia (Roxy, Sofi, Valen, Alito). Next.js + Supabase, instalable como PWA.

## Estado actual

- Identificación sin contraseña por localStorage (4 botones grandes).
- Lista agrupada por categorías fijas: Lácteos, Verdulería, Carnicería, Almacén, Limpieza.
- Cantidades en kilos (paso 0,25) para Verdulería y Carnicería, en unidades para el resto.
- Marcar/desmarcar comprado, vaciar comprados.
- PWA instalable (manifest + service worker + íconos generados).
- Los datos todavía se guardan en `localStorage` (por dispositivo). La sincronización en tiempo real con Supabase es el próximo paso.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).
