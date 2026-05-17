import { Link } from "react-router-dom";
import { Icons } from "../components/Icons";

export function HomePage() {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative pt-25 pb-24 px-4 overflow-hidden bg-linear-to-b from-sky-50 to-white">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-150 bg-sky-100/50 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="text-center md:text-left">
            <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-600 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-sky-200">
              Líderes en Tecnología
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight mb-8">
              Soluciones <span className="text-sky-500">Digitales</span> para tu
              Mundo
            </h1>
            <p className="text-slate-500 text-xl mb-10 leading-relaxed">
              Equípate con lo mejor y deja tus reparaciones en manos de expertos
              certificados. Innovación y confianza en un solo lugar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/products"
                className="bg-sky-500 hover:bg-sky-600 text-white px-10 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-xl shadow-sky-200 hover:-translate-y-1"
              >
                Comprar Ahora <Icons.ChevronRight />
              </Link>
              <Link
                to="/repairs"
                className="bg-white hover:bg-slate-50 text-slate-700 px-10 py-4 rounded-2xl font-bold text-lg transition-all border-2 border-slate-100 flex items-center justify-center gap-2 hover:-translate-y-1"
              >
                <span className="text-sky-500">
                  <Icons.Wrench />
                </span>
                Servicio Técnico
              </Link>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-sky-400/10 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
              alt="Desarrollo Tecnológico"
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover transform transition-transform group-hover:scale-[1.02] duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 animate-bounce-slow">
              <div className="bg-sky-100 p-3 rounded-xl text-sky-600">
                <Icons.Zap />
              </div>
              <div>
                <p className="text-slate-400 text-xs font-bold">
                  Respuesta Técnica
                </p>
                <p className="text-slate-900 font-black">Menos de 24hs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="group">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors duration-300">
                <span className="text-sky-500 group-hover:text-white transition-colors">
                  <Icons.Star />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Originalidad
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Componentes 100% auténticos directo de fábrica.
              </p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors duration-300">
                <span className="text-sky-500 group-hover:text-white transition-colors">
                  <Icons.Shield />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Garantía Real
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Respaldo total en cada compra y cada reparación.
              </p>
            </div>
            <div className="group">
              <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sky-500 transition-colors duration-300">
                <span className="text-sky-500 group-hover:text-white transition-colors">
                  <Icons.Clock />
                </span>
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">
                Rapidez
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Servicio express para que no pierdas tiempo.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
