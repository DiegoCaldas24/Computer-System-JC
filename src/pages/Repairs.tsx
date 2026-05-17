import { SERVICES } from "../data/data";

// --- Page: Repairs ---
export  function RepairsPage() {
  return (
    <div className="pt-25 pb-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <div className="w-20 h-2 bg-sky-500 mb-8 rounded-full"></div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-tight">
            Recuperamos tu{" "}
            <span className="text-sky-500 italic">Vida Digital</span>
          </h1>
          <p className="text-slate-500 text-xl mb-10 leading-relaxed">
            Especialistas certificados en reparación de hardware. Diagnóstico
            preciso sin costo inicial.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all hover:scale-105">
            Agendar por WhatsApp
          </button>
        </div>

        <div className="relative">
          <div className="bg-slate-50 rounded-[3rem] p-4 shadow-inner border border-slate-100">
            <img
              src="https://images.unsplash.com/photo-1597733336794-12d05021d510?auto=format&fit=crop&q=80&w=800"
              className="rounded-[2.5rem] w-full h-[500px] object-cover shadow-2xl"
              alt="Laboratorio"
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8 mb-32">
        {SERVICES.map((service, idx) => (
          <div
            key={idx}
            className="bg-slate-50 p-10 rounded-[2.5rem] border border-transparent hover:border-sky-200 transition-all hover:bg-white hover:shadow-xl group text-center"
          >
            <h3 className="text-xl font-bold text-slate-800 mb-4">
              {service.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="relative rounded-[4rem] overflow-hidden bg-slate-900 p-12 md:p-20">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tighter">
            ¿Problemas Técnicos?
          </h2>
          <p className="text-slate-400 text-lg mb-12">
            Recibe un presupuesto gratuito ahora mismo.
          </p>

          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Nombre"
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none"
              />
              <input
                type="text"
                placeholder="WhatsApp"
                className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none"
              />
            </div>
            <textarea
              placeholder="Falla del equipo..."
              rows={4}
              className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none resize-none"
            ></textarea>
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-black py-5 rounded-2xl transition-all shadow-lg text-lg uppercase tracking-widest">
              Solicitar Revisión
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}