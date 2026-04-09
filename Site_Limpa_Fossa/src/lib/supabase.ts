import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let _client: SupabaseClient | null = null

/**
 * Returns the Supabase client, initializing it on first call.
 * Throws only when first used (i.e. on form submit), NOT at module load time.
 * This allows the landing page to render even without .env.local configured.
 */
export function getSupabaseClient(): SupabaseClient {
  if (_client) return _client

  const url = import.meta.env.VITE_SUPABASE_URL as string
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string

  if (!url || !key) {
    throw new Error(
      'Supabase não configurado. Copie .env.example para .env.local e preencha as credenciais.'
    )
  }

  _client = createClient(url, key)
  return _client
}
