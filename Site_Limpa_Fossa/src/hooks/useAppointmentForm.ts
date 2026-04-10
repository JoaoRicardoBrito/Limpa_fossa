import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createAppointment } from '@/services/appointments'
import type { AppointmentFormData } from '@/types'

// --- Business rules ---
const BUSINESS_HOURS = { start: 7, end: 18 } // 07:00–18:00
const SESSION_KEY = 'limpa-fossa-form'
export const PRESELECT_KEY = 'limpa-fossa-preselect'

// --- Zod schema ---
const whatsappRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/

export const appointmentSchema = z.object({
  nome: z
    .string()
    .trim()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(100, 'Nome muito longo')
    .transform((val) => val.replace(/\s+/g, ' ')), // collapse internal spaces

  whatsapp: z
    .string()
    .trim()
    .max(20, 'WhatsApp inválido')
    .regex(whatsappRegex, 'WhatsApp inválido. Ex: (11) 99999-9999'),

  endereco: z
    .string()
    .trim()
    .min(5, 'Endereço deve ter pelo menos 5 caracteres')
    .max(200, 'Endereço muito longo')
    .transform((val) => val.replace(/\s+/g, ' ')), // collapse internal spaces

  servico: z.enum(['limpeza-fossa', 'desentupimento', 'caixa-gordura', 'hidrojateamento'], {
    error: 'Selecione um serviço',
  }),

  data_hora: z.string().refine((val) => {
    if (!val) return false
    const date = new Date(val)
    if (isNaN(date.getTime())) return false

    // Reject past dates
    if (date < new Date()) return false

    // Reject Sundays (0)
    if (date.getDay() === 0) return false

    // Reject outside business hours
    const hour = date.getHours()
    if (hour < BUSINESS_HOURS.start || hour >= BUSINESS_HOURS.end) return false

    return true
  }, 'Escolha seg–sáb entre 07h e 18h, e uma data futura'),
})

export type AppointmentSchema = z.infer<typeof appointmentSchema>

// --- Hook ---
export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function useAppointmentForm() {
  const form = useForm<AppointmentSchema>({
    resolver: zodResolver(appointmentSchema),
    mode: 'onBlur', // FORM-02: inline errors on blur
    defaultValues: loadFromSession(),
  })

  const { watch, formState: { isSubmitting }, setValue } = form

  // SERV-02: Apply service pre-selection written by ServicesSection card click
  useEffect(() => {
    try {
      const preselect = sessionStorage.getItem(PRESELECT_KEY)
      if (preselect) {
        setValue('servico', preselect as AppointmentSchema['servico'], { shouldValidate: false })
        sessionStorage.removeItem(PRESELECT_KEY)
      }
    } catch {
      // sessionStorage unavailable — silent fail
    }
  }, [setValue])

  // FORM-03: Persist to sessionStorage on every change
  useEffect(() => {
    const subscription = watch((values) => {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(values))
      } catch {
        // sessionStorage unavailable — silent fail
      }
    })
    return () => subscription.unsubscribe()
  }, [watch])

  async function onSubmit(data: AppointmentSchema): Promise<{ success: boolean; error?: string }> {
    try {
      await createAppointment(data as AppointmentFormData)
      sessionStorage.removeItem(SESSION_KEY) // clear on success
      return { success: true }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao enviar. Tente novamente.'
      return { success: false, error: message }
    }
  }

  return { form, isSubmitting, onSubmit }
}

function loadFromSession(): Partial<AppointmentSchema> {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    if (!raw) return {}
    return JSON.parse(raw) as Partial<AppointmentSchema>
  } catch {
    return {}
  }
}
