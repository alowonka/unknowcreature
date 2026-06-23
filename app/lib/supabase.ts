import { createClient } from "@supabase/supabase-js";

/**
 * Cliente Supabase con `service_role` para uso EXCLUSIVO server-side
 * (API routes / server actions). Bypassa RLS, así que nunca debe importarse
 * desde código que corra en el cliente.
 *
 * Es una factory (no un singleton a nivel de módulo) para que la falta de env
 * vars solo falle en runtime al atender un request — no en build time.
 */
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Faltan variables de entorno de Supabase (SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY).",
    );
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
