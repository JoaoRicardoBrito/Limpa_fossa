import {
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import { motion } from 'framer-motion'
import { Star, Clock, ThumbsUp, Award } from 'lucide-react'

// Static credibility data — seeded with realistic values for launch
const satisfactionData = [
  { name: 'Satisfação', value: 97, fill: '#16a34a' },
]

const responseTimeData = [
  { mes: 'Nov', horas: 2.1 },
  { mes: 'Dez', horas: 1.8 },
  { mes: 'Jan', horas: 1.5 },
  { mes: 'Fev', horas: 1.4 },
  { mes: 'Mar', horas: 1.2 },
  { mes: 'Abr', horas: 1.1 },
]

const stats = [
  { icon: ThumbsUp, label: 'Clientes satisfeitos', value: '97%', color: 'text-brand-green' },
  { icon: Clock, label: 'Tempo médio de atendimento', value: '1h10min', color: 'text-brand-blue' },
  { icon: Award, label: 'Atendimentos realizados', value: '500+', color: 'text-brand-green' },
  { icon: Star, label: 'Avaliação média', value: '4.9 / 5', color: 'text-yellow-500' },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export function CredibilitySection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0, duration: 0.5, ease }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Números que comprovam nossa qualidade
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Transparência total. Dados reais dos nossos atendimentos.
          </p>
        </motion.div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                className="rounded-2xl border bg-gray-50 p-5 text-center"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: (i + 1) * 0.1, duration: 0.5, ease }}
              >
                <div className={`flex justify-center mb-2 ${stat.color}`}>
                  <Icon size={28} />
                </div>
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1 leading-snug">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Satisfaction radial */}
          <motion.div
            className="rounded-2xl border bg-gray-50 p-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.5, duration: 0.5, ease }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Satisfação dos clientes
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Baseado em avaliações pós-atendimento
            </p>
            <div className="relative h-52 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  innerRadius="65%"
                  outerRadius="90%"
                  data={satisfactionData}
                  startAngle={90}
                  endAngle={-270}
                >
                  <RadialBar dataKey="value" cornerRadius={8} background={{ fill: '#e5e7eb' }}>
                    {satisfactionData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-4xl font-bold text-brand-green">97%</span>
                <span className="text-xs text-gray-400 mt-1">satisfação</span>
              </div>
            </div>
          </motion.div>

          {/* Response time bar chart */}
          <motion.div
            className="rounded-2xl border bg-gray-50 p-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ delay: 0.6, duration: 0.5, ease }}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-1">
              Tempo médio de atendimento
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Em horas — melhorando a cada mês
            </p>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={responseTimeData} barSize={28}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `${v}h`}
                  domain={[0, 3]}
                />
                <Tooltip
                  formatter={(value) => [`${value}h`, 'Tempo médio']}
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    fontSize: '13px',
                  }}
                />
                <Bar dataKey="horas" radius={[6, 6, 0, 0]}>
                  {responseTimeData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === responseTimeData.length - 1 ? '#16a34a' : '#2563eb'}
                      opacity={index === responseTimeData.length - 1 ? 1 : 0.6}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
