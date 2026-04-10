export type ServiceType =
  | 'limpeza-fossa'
  | 'desentupimento'
  | 'caixa-gordura'
  | 'hidrojateamento'

export const SERVICE_LABELS: Record<ServiceType, string> = {
  'limpeza-fossa': 'Limpeza de Fossa',
  'desentupimento': 'Desentupimento de Rede de Esgoto',
  'caixa-gordura': 'Caixa de Gordura',
  'hidrojateamento': 'Hidrojateamento',
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
