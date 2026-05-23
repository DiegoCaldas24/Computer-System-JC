import logo from "../assets/logoIcon.png";
import { Icons } from "./Icons";

export default function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 py-16 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center">
            <img className="w-40" src={logo} />
          </div>
          <p className="text-sm leading-relaxed">
            Expertos en soluciones tecnológicas integrales. Desde la venta del
            mejor hardware hasta el soporte técnico más avanzado.
          </p>
        </div>
        <div>
          <h3 className="text-slate-900 font-bold mb-6 uppercase text-xs tracking-widest">
            Empresa
          </h3>
          <ul className="space-y-3 text-sm">
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
          </ul>
        </div>
        <div>
          <h3 className="text-slate-900 font-bold mb-6 uppercase text-xs tracking-widest">
            Ayuda
          </h3>
          <ul className="space-y-3 text-sm">
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
          <h3 className="text-slate-900 font-bold mb-6 uppercase text-xs tracking-widest">
            Newsletter
          </h3>
          <p className="text-xs mb-4">Recibe ofertas exclusivas y novedades.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Tu email"
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-sky-500 w-full"
            />
            <button className="bg-sky-500 text-white p-2 rounded-lg hover:bg-sky-600">
              <Icons.ChevronRight />
            </button>
          </div>
        </div>
      </div>
      <div className="text-center mt-16 text-xs text-slate-400 border-t border-gray-200 pt-8">
        &copy; 2024 TechPro Solutions. 15498, Ate 15498
      </div>
    </footer>
  );
}
