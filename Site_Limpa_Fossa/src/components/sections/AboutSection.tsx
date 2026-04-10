import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Users, Recycle } from 'lucide-react'

const highlights = [
  { icon: ShieldCheck, text: '✅ Licença ambiental regularizada' },
  { icon: Users, text: '✅ Equipe certificada e treinada' },
  { icon: Recycle, text: '✅ Descarte correto dos resíduos' },
  { icon: Leaf, text: '✅ Atendimento rápido e humanizado' },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease }}
          >
            <span className="inline-block text-brand-green text-sm font-semibold uppercase tracking-widest mb-3">
              🌿 Quem Somos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Saneamento com propósito e responsabilidade ambiental
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              A <strong>Santa Clara ECO</strong> nasceu com um propósito claro: oferecer serviços
              de saneamento com responsabilidade ambiental e compromisso com a qualidade. Com uma
              equipe experiente e equipamentos modernos, atendemos residências e empresas com
              agilidade e eficiência.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nossa missão é cuidar do ambiente onde você vive e trabalha — porque saneamento de
              qualidade faz parte de um futuro mais limpo e sustentável. 🌱
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {highlights.map((item) => (
                <li key={item.text} className="text-gray-700 font-medium">
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual column */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="rounded-2xl bg-gradient-to-br from-brand-green/10 to-brand-blue/10 border border-brand-green/20 p-10 text-center max-w-sm w-full">
              <div className="text-7xl mb-6">🌿</div>
              <p className="text-brand-green font-bold text-2xl mb-2">Santa Clara ECO</p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Cuidando do seu ambiente com responsabilidade,<br />
                tecnologia e respeito à natureza.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="text-2xl font-bold text-brand-green">500+</p>
                  <p className="text-xs text-gray-500 mt-1">Atendimentos</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="text-2xl font-bold text-brand-green">97%</p>
                  <p className="text-xs text-gray-500 mt-1">Satisfação</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
