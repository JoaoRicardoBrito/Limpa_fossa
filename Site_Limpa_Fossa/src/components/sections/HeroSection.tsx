import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { waLink } from '@/lib/constants'

export function HeroSection() {
  return (
    <section
      id="inicio"
      className="bg-gradient-to-br from-brand-green to-brand-blue py-12 md:py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center text-white">
        {/* Service area badge */}
        <Badge className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30 text-sm px-4 py-1">
          📍 Atendemos em sua cidade e região
        </Badge>

        {/* Main headline */}
        <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
          Limpeza de Fossa{' '}
          <span className="text-yellow-300">Rápida</span> e Sem Complicação
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Atendimento em até 2 horas. Profissionais certificados e equipamentos
          modernos para sua residência ou empresa.
        </p>

        {/* Primary CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#agendamento">
            <Button
              size="lg"
              className="bg-white text-brand-green hover:bg-gray-100 font-bold text-lg px-8 py-6 shadow-lg"
            >
              Agendar Agora
            </Button>
          </a>

          {/* Secondary CTA */}
          <a
            href={waLink('Olá! Gostaria de falar sobre um serviço.')}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors"
          >
            <Phone size={18} />
            ou fale pelo WhatsApp
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          <span>✓ Mais de 500 atendimentos</span>
          <span>✓ Licença ambiental</span>
          <span>✓ Garantia de serviço</span>
        </div>
      </div>
    </section>
  )
}
