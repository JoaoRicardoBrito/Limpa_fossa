import { getSupabaseClient } from '@/lib/supabase'
import type { AppointmentFormData } from '@/types'

/**
 * Insert a new appointment into Supabase.
 *
 * RLS policy required on Supabase dashboard:
 *   ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "Public can insert appointments"
 *     ON appointments FOR INSERT TO anon WITH CHECK (true);
 *   -- No SELECT policy for anon = zero read access (protects PII / LGPD)
 *
 * Table schema:
 *   id          uuid default gen_random_uuid() primary key,
 *   nome        text not null,
 *   whatsapp    text not null,
 *   endereco    text not null,
 *   servico     text not null,
 *   data_hora   text not null,
 *   criado_em   timestamptz default now()
 */
export async function createAppointment(data: AppointmentFormData): Promise<void> {
  const supabase = getSupabaseClient()

  const { error } = await supabase.from('appointments').insert([
    {
      nome: data.nome,
      whatsapp: data.whatsapp,
      endereco: data.endereco,
      servico: data.servico,
      data_hora: data.data_hora,
    },
  ])

  if (error) {
    throw new Error(error.message)
  }
}
