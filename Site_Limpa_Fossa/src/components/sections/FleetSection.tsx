import { motion } from 'framer-motion'
import caminhao1 from '@/assets/caminhao1.jpeg'
import caminhao2 from '@/assets/caminhao2.jpeg'
import caminhao3 from '@/assets/caminhao3.jpeg'
import caminhao5 from '@/assets/caminhao5.jpeg'

const trucks = [
  { src: caminhao1, alt: 'Caminhão de limpeza de fossa Santa Clara ECO 1' },
  { src: caminhao2, alt: 'Caminhão de limpeza de fossa Santa Clara ECO 2' },
  { src: caminhao3, alt: 'Caminhão de hidrojateamento Santa Clara ECO 3' },
  { src: caminhao5, alt: 'Veículo operacional Santa Clara ECO 5' },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function FleetSection() {
  return (
    <section id="frota" className="py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease }}
        >
          <span className="inline-block text-brand-green text-sm font-semibold uppercase tracking-widest mb-3">
            Estrutura
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nossa Frota 🚛
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Equipamentos modernos e hidrojateamento de alta tecnologia para um serviço eficiente.
          </p>
        </motion.div>

        {/* Gallery grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trucks.map((truck, i) => (
            <motion.div
              key={truck.alt}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.45, ease }}
              whileHover={{ scale: 1.02 }}
              className={
                // First image spans 2 columns on large screens for visual emphasis
                i === 0 ? 'lg:col-span-2' : ''
              }
            >
              <div className="overflow-hidden rounded-2xl shadow-sm border border-gray-200 bg-white h-56 sm:h-64">
                <img
                  src={truck.src}
                  alt={truck.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
