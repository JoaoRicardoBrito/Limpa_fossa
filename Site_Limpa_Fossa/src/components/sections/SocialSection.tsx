import { motion } from 'framer-motion'
import { MessageCircle, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { waLink } from '@/lib/constants'

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
            >
              <Button
                size="lg"
                className="w-full sm:w-auto bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold gap-2 px-8 py-5 text-base shadow-lg"
              >
                <MessageCircle size={20} fill="white" />
                Chamar no WhatsApp
              </Button>
            </motion.a>

            {/* Instagram CTA */}
            <motion.a
              href="https://www.instagram.com/santaclaraeco?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-brand-green font-bold gap-2 px-8 py-5 text-base"
              >
                <Share2 size={20} />
                Seguir no Instagram
              </Button>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
