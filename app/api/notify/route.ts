import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase";

export const runtime = "nodejs";

// Validación de email deliberadamente simple (la verdad de validez la da el envío real).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { email?: string; locale?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = (body.email ?? "").trim().toLowerCase();
  const locale = body.locale === "es" ? "es" : "en";

  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from("leads")
      .insert({ email, locale, source: "landing-notify" });

    // 23505 = unique_violation: el email ya estaba en la lista. Para el usuario
    // es lo mismo que un alta exitosa, así que no lo tratamos como error.
    if (error && error.code !== "23505") {
      console.error("[notify] insert error:", error.message);
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[notify] route error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
