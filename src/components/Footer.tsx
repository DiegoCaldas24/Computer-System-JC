import logob from "../assets/logo-vec-h-w.png";
import { Icons } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-[#0d1b36] text-slate-600 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center">
            <img className="w-40" src={logob} />
          </div>
          <p className="text-sm text-white leading-relaxed">
            Expertos en soluciones tecnológicas integrales. Desde la venta del
            mejor hardware hasta el soporte técnico más avanzado.
          </p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Empresa
          </h3>
          <ul className="space-y-3 text-sm text-white">
            <li>
              <a href="#" className="hover:text-sky-500 transition-colors">
                Sobre Nosotros
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-500 transition-colors">
                Nuestras Tiendas
              </a>
            </li>
            <li>
              <i className="fa-brands fa-tiktok"></i>
              <a
                href="https://www.tiktok.com/@computersystemjc?lang=es"
                target="_blank"
                className="hover:text-sky-500 transition-colors"
              >
                TikTok
              </a>
            </li>
            <li>
              <i className="fa-brands fa-facebook"></i>
              <a
                href="https://www.facebook.com/profile.php?id=61581330572746"
                target="_blank"
                className="hover:text-sky-500 transition-colors"
              >
                Facebook
              </a>
            </li>
            <li>
              <i className="fa-brands fa-instagram"></i>
              <a
                href="https://www.instagram.com/computersystemjc.b2/?hl=es"
                target="_blank"
                className="hover:text-sky-500 transition-colors"
              >
                Instagram
              </a>
            </li>
            <li>
              <i className="fa-brands fa-youtube"></i>
              <a
                href="https://www.youtube.com/@ComputerSystemJC"
                target="_blank"
                className="hover:text-sky-500 transition-colors"
              >
                Youtube
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Ayuda
          </h3>
          <ul className="space-y-3 text-sm text-white">
            <li>
              <a href="#" className="hover:text-sky-500 transition-colors">
                Centro de Soporte
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-500 transition-colors">
                Garantía
              </a>
            </li>
          </ul>
        </div>
        <div>
          <a
            href="https://wa.me/51986037556"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-base px-6 py-4 rounded-xl shadow-lg transition-all hover:-translate-y-1"
          >
            <Icons.Whatsapp />
            <span>
              Para cualquier consulta o cotización escribir al 986 037 556
            </span>
          </a>
        </div>
      </div>
      <div className="text-center m-2 text-xs text-white border-t border-gray-200 p-4">
        &copy; 2026 Computer Systems - JC. Av. Nicolás Ayllón 5445,Segundo piso,
        Tienda B2, Ate 15498
      </div>
    </footer>
  );
}
