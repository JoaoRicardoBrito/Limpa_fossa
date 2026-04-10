/** WhatsApp number in international format (no + or spaces) */
export const WA_NUMBER = '5586999006920'

export const WA_MESSAGE_DEFAULT =
  'Olá! Gostaria de agendar um serviço de limpeza de fossa.'

export function waLink(message: string = WA_MESSAGE_DEFAULT): string {
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`
}
