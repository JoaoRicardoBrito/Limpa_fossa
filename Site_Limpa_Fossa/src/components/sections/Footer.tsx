import { Phone, MapPin } from 'lucide-react'
import { waLink } from '@/lib/constants'
import whatsappLogo from '@/assets/whastapp.png'
import instagramLogo from '@/assets/instagram.png'

export function Footer() {
  return (
    <footer id="contato" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Brand */}
          <div>
            <p className="text-brand-green font-bold text-xl mb-3">
              Santa Clara ECO
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              🌿 Saneamento com responsabilidade ambiental. Qualidade,
              agilidade e compromisso com um futuro mais limpo e sustentável.
            </p>
          </div>

          {/* Column 2: Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contato</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-green shrink-0" />
                <span>(86) 99900-6920</span>
              </li>
              <li className="flex items-center gap-2">
                <img src={whatsappLogo} alt="WhatsApp" className="w-4 h-4 object-contain shrink-0" />
                <a
                  href={waLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-green transition-colors"
                >
                  (86) 99900-6920
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-green shrink-0" />
                <span>Teresina, Piauí e região</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="font-semibold text-white mb-4">Redes Sociais</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://www.instagram.com/santaclaraeco?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-brand-green transition-colors text-sm"
                >
                  <img src={instagramLogo} alt="Instagram" className="w-4 h-4 object-contain shrink-0" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <p className="text-center text-gray-500 text-sm">
          © 2026 Santa Clara ECO. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
