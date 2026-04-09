export type ServiceType =
  | 'limpeza-fossa'
  | 'desentupimento'
  | 'caixa-gordura'

export const SERVICE_LABELS: Record<ServiceType, string> = {
  'limpeza-fossa': 'Limpeza de Fossa',
  'desentupimento': 'Desentupimento',
  'caixa-gordura': 'Caixa de Gordura',
}

export interface AppointmentFormData {
  nome: string
  whatsapp: string
  endereco: string
  servico: ServiceType
  data_hora: string
}

export interface Appointment extends AppointmentFormData {
  id?: string
  criado_em?: string
}
