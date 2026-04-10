import { motion } from 'framer-motion'
import { waLink } from '@/lib/constants'
import whatsappLogo from '@/assets/whastapp.png'

export function WhatsAppButton() {
  return (
    <motion.a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-lg"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <img src={whatsappLogo} alt="WhatsApp" className="w-6 h-6 object-contain shrink-0" />
      <span className="hidden sm:inline text-sm font-semibold">WhatsApp</span>
    </motion.a>
  )
}
