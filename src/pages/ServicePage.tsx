import { Carousel } from "../shared/components/Carousel";
import logoWatermark from "../assets/logos/logo-vec-icon.png";
import { Icons } from "../shared/components/Icons";
import { WHATSAPP_URL } from "../shared/constants";

const services = [
  {
    title: "Reparación de Impresoras, Laptops y PC",
    description:
      "Diagnóstico, mantenimiento y reparación de equipos informáticos con soluciones rápidas y efectivas.",
    image: "/services/image_impresora_m.jpeg",
  },
  {
    title: "Repotenciamiento de Laptops",
    description:
      "Mejoramos el rendimiento de tu laptop con upgrades de SSD, RAM y optimización del sistema.",
    image: "/services/image_laptop_r.jpeg",
  },
  {
    title: "Armado de PC",
    description:
      "Ensamblamos computadoras personalizadas para gaming, oficina y diseño profesional.",
    image: "/services/image_pc_a.jpeg",
  },
  {
    title: "Recuperación de Datos",
    description:
      "Recuperamos información importante desde discos dañados, memorias y sistemas corruptos.",
    image: "/services/image_datos-r.jpeg",
  },
];

export function ServicePage() {

  return (
    <div className="min-h-screen bg-[#e9edf1] relative">
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${logoWatermark})`,
          backgroundRepeat: "repeat",
          backgroundSize: "240px",
          opacity: 0.04,
        }}
      />
      <div className="relative z-10">
        {/* HERO */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 pt-20 md:pt-28 pb-10 md:pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* CAROUSEL */}
            <Carousel
              items={services}
              renderItem={(service) => (
                <div className="relative w-full h-full">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 text-white">
                    <h1 className="text-xl md:text-4xl font-bold leading-tight max-w-md mb-3 md:mb-5">
                      {service.title}
                    </h1>
                    <p className="text-white max-w-md leading-relaxed mb-4 md:mb-6 text-xs md:text-base line-clamp-2 md:line-clamp-none">
                      {service.description}
                    </p>
                    <button className="bg-[#0088d2] hover:bg-[#139ae4] transition-all w-fit px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-semibold rounded">
                      Solicitar Servicio
                    </button>
                  </div>
                </div>
              )}
              autoPlay
              interval={5000}
              heightClass="h-64 md:h-105"
              roundedClass="rounded-xl"
              containerClass="shadow-xl"
            />

            {/* INFO */}
            <div className="bg-[#07294d] rounded-xl p-6 md:p-10 text-white flex flex-col justify-center shadow-xl">
              <h2 className="text-2xl md:text-4xl font-bold leading-tight mb-4 md:mb-6">
                Soluciones Tecnológicas Confiables
              </h2>

              <p className="text-white leading-relaxed mb-6 md:mb-8 text-sm md:text-base">
                Brindamos soporte técnico especializado para empresas y clientes
                particulares. Nuestro equipo trabaja con rapidez, garantía y
                tecnología moderna para ofrecer resultados profesionales.
              </p>

              <div className="grid grid-cols-2 gap-3 md:gap-5">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white/10 border border-white/10 rounded-lg p-3 md:p-4"
                  >
                    <h3 className="text-[10px] md:text-sm font-semibold leading-snug">
                      {service.title}
                    </h3>
                  </div>
                ))}
              </div>

              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 md:mt-8 flex items-center justify-center gap-2 md:gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs md:text-base px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-lg transition-all hover:-translate-y-1"
              >
                <Icons.Whatsapp />
                <span>
                  Para cualquier consulta o cotización escribir al 986 037 556
                </span>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* GALERÍA */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pb-20">
        <div className="mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl font-bold text-[#0b1f3a] mb-2 md:mb-3">
            Nuestros Servicios
          </h2>

          <p className="text-black text-sm md:text-base">
            Descubre las soluciones tecnológicas que ofrecemos para potenciar y
            proteger tus equipos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-7">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:-translate-y-2 transition-all duration-300"
            >
              <div className="overflow-hidden h-48 md:h-56">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-base md:text-xl font-bold text-[#0b1f3a] mb-2 md:mb-3">
                  {service.title}
                </h3>

                <p className="text-black text-xs md:text-sm leading-relaxed">
                  {service.description}
                </p>

                <button className="mt-3 md:mt-5 text-[#0088d2] font-semibold hover:underline text-sm md:text-base">
                  Ver más →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}