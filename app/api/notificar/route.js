import { NextResponse } from "next/server";
import webpush from "web-push";
import { createClient } from "@supabase/supabase-js";

webpush.setVapidDetails(
  process.env.VAPID_SUBJECT,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(request) {
  const secreto = request.headers.get("x-webhook-secret");
  if (secreto !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  const payload = await request.json();
  const { type, record, old_record } = payload;

  const seAcabaDeMarcar = type === "UPDATE" && record?.comprado && !old_record?.comprado;
  if (!seAcabaDeMarcar || !record.marcado_por) {
    return NextResponse.json({ ok: true, ignorado: true });
  }

  const quienMarco = record.marcado_por;

  const { data: subs, error } = await supabase
    .from("push_subscriptions")
    .select("*")
    .neq("usuario", quienMarco);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const mensaje = JSON.stringify({
    title: "Lista de compras",
    body: `${quienMarco} compró ${record.nombre}`,
  });

  const resultados = await Promise.allSettled(
    (subs ?? []).map((sub) =>
      webpush.sendNotification(
        { endpoint: sub.endpoint, keys: { p256dh: sub.p256dh, auth: sub.auth } },
        mensaje
      )
    )
  );

  const vencidasIds = (subs ?? [])
    .filter((_, i) => {
      const r = resultados[i];
      return r.status === "rejected" && [404, 410].includes(r.reason?.statusCode);
    })
    .map((sub) => sub.id);

  if (vencidasIds.length > 0) {
    await supabase.from("push_subscriptions").delete().in("id", vencidasIds);
  }

  return NextResponse.json({ ok: true, enviados: subs?.length ?? 0 });
}
