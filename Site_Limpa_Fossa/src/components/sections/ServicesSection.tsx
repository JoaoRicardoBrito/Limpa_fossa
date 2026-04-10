import { Droplets, Wrench, Container, Zap } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { PRESELECT_KEY } from '@/hooks/useAppointmentForm'
import type { ServiceType } from '@/types'

interface Service {
  icon: LucideIcon
  title: string
  description: string
  value: ServiceType
}

const services: Service[] = [
  {
    icon: Droplets,
    title: '🪣 Limpeza de Fossa',
    description:
      'Serviço completo de limpeza e esvaziamento de fossas sépticas com equipamentos modernos e equipe especializada.',
    value: 'limpeza-fossa',
  },
  {
    icon: Wrench,
    title: '🚿 Desentupimento de Rede de Esgoto',
    description:
      'Desentupimento especializado em redes de esgoto, canos, tubulações e coletores — com tecnologia e rapidez garantida.',
    value: 'desentupimento',
  },
  {
    icon: Container,
    title: '🍳 Caixa de Gordura',
    description:
      'Limpeza e manutenção preventiva de caixas de gordura residenciais e comerciais, evitando entupimentos.',
    value: 'caixa-gordura',
  },
  {
    icon: Zap,
    title: '💧 Hidrojateamento',
    description:
      'Limpeza de alta pressão para desobstruir tubulações, galerias e redes de esgoto com máxima eficiência e segurança.',
    value: 'hidrojateamento',
  },
]

function preselectService(value: ServiceType) {
  try {
    sessionStorage.setItem(PRESELECT_KEY, value)
  } catch {
    // sessionStorage unavailable — silent fail
  }
}

export function ServicesSection() {
  return (
    <section id="servicos" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossos Serviços
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Soluções completas de saneamento para residências e empresas,
            com atendimento rápido e equipe qualificada.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: i * 0.12, duration: 0.45, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
              >
                {/* SERV-02: clicking a card pre-selects the service in the form */}
                <a
                  href="#agendamento"
                  onClick={() => preselectService(service.value)}
                  className="block h-full group"
                  aria-label={`Agendar ${service.title}`}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow bg-white h-full cursor-pointer group-hover:border-brand-green/40">
                    <CardHeader>
                      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-green/10 group-hover:bg-brand-green/20 transition-colors">
                        <Icon className="h-8 w-8 text-brand-green" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base leading-relaxed">
                        {service.description}
                      </CardDescription>
                      <p className="mt-4 text-sm font-medium text-brand-green opacity-0 group-hover:opacity-100 transition-opacity">
                        Agendar este serviço →
                      </p>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
