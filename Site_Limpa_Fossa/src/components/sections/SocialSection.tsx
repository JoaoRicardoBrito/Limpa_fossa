import { motion } from 'framer-motion'
import { waLink } from '@/lib/constants'
import whatsappLogo from '@/assets/whastapp.png'
import instagramLogo from '@/assets/instagram.png'

export function SocialSection() {
  return (
    <section className="py-14 px-4 bg-gradient-to-br from-brand-green to-brand-blue">
      <div className="max-w-2xl mx-auto text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Prefere falar direto com a gente?
          </h2>
          <p className="text-white/80 mb-8">
            Atendemos pelo WhatsApp ou pelas redes sociais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* WhatsApp CTA */}
            <motion.a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-3 text-base shadow-lg transition-colors"
            >
              <img src={whatsappLogo} alt="WhatsApp" className="w-5 h-5 object-contain" />
              Chamar no WhatsApp
            </motion.a>

            {/* Instagram CTA */}
            <motion.a
              href="https://www.instagram.com/santaclaraeco?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-white bg-transparent hover:bg-white hover:text-brand-green text-white font-bold px-8 py-3 text-base transition-colors"
            >
              <img src={instagramLogo} alt="Instagram" className="w-5 h-5 object-contain" />
              Seguir no Instagram
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
