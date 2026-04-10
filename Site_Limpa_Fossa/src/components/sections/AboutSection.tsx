import { motion } from 'framer-motion'

const highlights = [
  '✅ Fundada em 2011 com foco em soluções ambientais',
  '✅ Equipe certificada com equipamentos modernos',
  '✅ Licença ambiental regularizada',
  '✅ Descarte responsável e ecológico dos resíduos',
  '✅ Atendimento rápido e humanizado',
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function AboutSection() {
  return (
    <section id="sobre" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section label */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease }}
        >
          <span className="inline-block text-brand-green text-sm font-semibold uppercase tracking-widest mb-3">
            Sobre Nós
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Nossa História 🌿
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease }}
          >
            <p className="text-gray-600 leading-relaxed mb-4">
              Desde <strong>2011</strong>, a <strong>Santa Clara ECO</strong> atua no saneamento
              com um compromisso claro: cuidar do ambiente onde as pessoas vivem e trabalham, com
              responsabilidade, qualidade e respeito à natureza. 🌱
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Com uma equipe experiente e <strong>equipamentos modernos</strong>, oferecemos
              soluções completas para residências e empresas — sempre priorizando a eficiência,
              a segurança e o descarte correto dos resíduos. Porque saneamento de qualidade faz
              parte de um futuro mais limpo e sustentável. ♻️
            </p>

            {/* Highlights */}
            <ul className="space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="text-gray-700 font-medium text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Visual card column */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
            className="flex justify-center"
          >
            <div className="rounded-2xl bg-gradient-to-br from-brand-green/10 to-brand-blue/10 border border-brand-green/20 p-10 text-center max-w-sm w-full">
              <div className="text-6xl mb-5">🌿</div>
              <p className="text-brand-green font-bold text-2xl mb-1">Santa Clara ECO</p>
              <p className="text-gray-400 text-xs mb-6">Desde 2011</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Cuidando do seu ambiente com responsabilidade,<br />
                tecnologia e respeito à natureza.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="text-xl font-bold text-brand-green">15+</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">Anos de experiência</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="text-xl font-bold text-brand-green">500+</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">Atendimentos</p>
                </div>
                <div className="bg-white rounded-xl p-3 shadow-sm">
                  <p className="text-xl font-bold text-brand-green">97%</p>
                  <p className="text-xs text-gray-500 mt-1 leading-tight">Satisfação</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
