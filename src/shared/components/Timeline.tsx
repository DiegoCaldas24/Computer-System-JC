type TimelineItem = {
  date: string;
  title: string;
  description: string;
};

const ITEMS: TimelineItem[] = [
  {
    date: "Agosto 2018",
    title: "Fundación",
    description: "Nace Computer System JC con la visión de ofrecer tecnología accesible y de calidad.",
  },
  {
    date: "Marzo 2021",
    title: "Expansión",
    description: "Abrimos nuestro local principal y ampliamos el catálogo de productos y servicios.",
  },
  {
    date: "Enero 2025",
    title: "Tienda Online",
    description: "Lanzamos nuestra tienda en línea para llegar a más clientes en todo el país.",
  },
];

export function Timeline() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#0b1f3a]">Nuestra Trayectoria</h2>
          <div className="w-20 h-1 bg-[#0088d2] mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative">
          <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-[#0088d2]/30 hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {ITEMS.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <span className="text-sm font-semibold text-[#0088d2] bg-[#0088d2]/10 px-3 py-1 rounded-full mb-4">
                  {item.date}
                </span>

                <div className="relative z-10 w-8 h-8 rounded-full bg-[#0088d2] border-4 border-white shadow-md mb-4 shrink-0" />

                <h3 className="text-lg font-bold text-[#0b1f3a] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
