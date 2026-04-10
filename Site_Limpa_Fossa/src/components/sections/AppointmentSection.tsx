import { useState } from 'react'
import { CheckCircle, Loader2, AlertCircle, MessageCircle } from 'lucide-react'
import { useAppointmentForm } from '@/hooks/useAppointmentForm'
import { Button } from '@/components/ui/button'
import { SERVICE_LABELS } from '@/types'
import { waLink } from '@/lib/constants'
import type { AppointmentSchema } from '@/hooks/useAppointmentForm'

type SubmitResult = { success: boolean; error?: string }

export function AppointmentSection() {
  const { form, onSubmit } = useAppointmentForm()
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form

  async function handleFormSubmit(data: AppointmentSchema) {
    setSubmitting(true)
    const res = await onSubmit(data)
    setResult(res)
    setSubmitting(false)
  }

  // FORM-06: Success screen replaces form after submission
  if (result?.success) {
    const values = getValues()
    const serviceLabel = SERVICE_LABELS[values.servico] ?? values.servico
    return (
      <section id="agendamento" className="py-16 px-4 bg-gray-50">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <CheckCircle className="mx-auto mb-4 text-brand-green" size={56} />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Agendamento realizado com sucesso!
            </h2>
            <p className="text-gray-500 mb-6">
              Recebemos seu pedido de <strong>{serviceLabel}</strong>. Em breve
              entraremos em contato para confirmar.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 text-left text-sm text-gray-700 space-y-2 mb-6">
              <p><span className="font-medium">Nome:</span> {values.nome}</p>
              <p><span className="font-medium">WhatsApp:</span> {values.whatsapp}</p>
              <p><span className="font-medium">Endereço:</span> {values.endereco}</p>
              <p><span className="font-medium">Serviço:</span> {serviceLabel}</p>
              <p><span className="font-medium">Data/Hora:</span> {values.data_hora}</p>
            </div>
            <a
              href={waLink(`Olá! Acabei de agendar um ${serviceLabel} pelo site. Meu nome é ${values.nome}.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="w-full bg-brand-green hover:bg-brand-green/90 gap-2">
                <MessageCircle size={18} />
                Confirmar pelo WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="agendamento" className="py-16 px-4 bg-gray-50">
      <div className="max-w-lg mx-auto">
        {/* Section header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Agendar Serviço</h2>
          <p className="text-gray-500">
            Preencha o formulário e entraremos em contato em até 30 minutos.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">
          {/* FORM-07: Error banner with fields preserved */}
          {result?.error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Erro ao enviar</p>
                <p>{result.error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(handleFormSubmit)} noValidate className="space-y-5">

            {/* Nome */}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo <span className="text-red-500">*</span>
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                autoComplete="name"
                {...register('nome')}
                className={inputClass(!!errors.nome)}
              />
              {errors.nome && <FieldError message={errors.nome.message} />}
            </div>

            {/* WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <input
                id="whatsapp"
                type="tel"
                placeholder="(11) 99999-9999"
                autoComplete="tel"
                {...register('whatsapp')}
                className={inputClass(!!errors.whatsapp)}
              />
              {errors.whatsapp && <FieldError message={errors.whatsapp.message} />}
            </div>

            {/* Endereço */}
            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço <span className="text-red-500">*</span>
              </label>
              <input
                id="endereco"
                type="text"
                placeholder="Rua, número, bairro"
                autoComplete="street-address"
                {...register('endereco')}
                className={inputClass(!!errors.endereco)}
              />
              {errors.endereco && <FieldError message={errors.endereco.message} />}
            </div>

            {/* Serviço */}
            <div>
              <label htmlFor="servico" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de serviço <span className="text-red-500">*</span>
              </label>
              <select
                id="servico"
                {...register('servico')}
                className={inputClass(!!errors.servico)}
                defaultValue=""
              >
                <option value="" disabled>Selecione um serviço...</option>
                <option value="limpeza-fossa">🪣 Limpeza de Fossa</option>
                <option value="desentupimento">🚿 Desentupimento de Rede de Esgoto</option>
                <option value="caixa-gordura">🍳 Caixa de Gordura</option>
                <option value="hidrojateamento">💧 Hidrojateamento</option>
              </select>
              {errors.servico && <FieldError message={errors.servico.message} />}
            </div>

            {/* Data/Hora — FORM-04: business hours hint */}
            <div>
              <label htmlFor="data_hora" className="block text-sm font-medium text-gray-700 mb-1">
                Data e horário preferidos <span className="text-red-500">*</span>
              </label>
              <input
                id="data_hora"
                type="datetime-local"
                {...register('data_hora')}
                className={inputClass(!!errors.data_hora)}
              />
              <p className="mt-1 text-xs text-gray-400">
                Atendemos seg–sáb das 07h às 18h
              </p>
              {errors.data_hora && <FieldError message={errors.data_hora.message} />}
            </div>

            {/* FORM-05: Submit with loading state + disabled during submit */}
            <Button
              type="submit"
              disabled={submitting}
              className="w-full bg-brand-green hover:bg-brand-green/90 text-white font-semibold py-3 text-base gap-2 mt-2"
            >
              {submitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                'Confirmar Agendamento'
              )}
            </Button>

            <p className="text-center text-xs text-gray-400">
              Seus dados são usados apenas para contato referente ao serviço.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

function inputClass(hasError: boolean) {
  return [
    'w-full rounded-md border px-3 py-2.5 text-sm text-gray-900',
    'focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent',
    'transition-colors bg-white',
    hasError
      ? 'border-red-400 focus:ring-red-400'
      : 'border-gray-300',
  ].join(' ')
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
      <AlertCircle size={12} />
      {message}
    </p>
  )
}
