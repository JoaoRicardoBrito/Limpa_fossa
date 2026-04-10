import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

const INTERVAL_MS = 5000

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
}

const ease = [0.25, 0.1, 0.25, 1] as const

export function FleetSection() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir)
    setCurrent(index)
  }, [])

  const prev = useCallback(() => {
    goTo((current - 1 + trucks.length) % trucks.length, -1)
  }, [current, goTo])

  const next = useCallback(() => {
    goTo((current + 1) % trucks.length, 1)
  }, [current, goTo])

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [next])

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

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">

          {/* Image frame */}
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-2xl shadow-md bg-gray-900">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={current}
                src={trucks[current].src}
                alt={trucks[current].alt}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                draggable={false}
              />
            </AnimatePresence>

            {/* Gradient overlay for controls legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-2xl" />

            {/* Prev button */}
            <button
              onClick={prev}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Next button */}
            <button
              onClick={next}
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white transition-colors"
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter */}
            <span className="absolute bottom-4 right-4 text-white/80 text-xs font-medium z-10">
              {current + 1} / {trucks.length}
            </span>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-5">
            {trucks.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                aria-label={`Ir para imagem ${i + 1}`}
                className={[
                  'h-2 rounded-full transition-all duration-300',
                  i === current
                    ? 'w-6 bg-brand-green'
                    : 'w-2 bg-gray-300 hover:bg-gray-400',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
