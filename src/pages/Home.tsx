import { Link } from "react-router-dom";
import logoWatermark from "../assets/logos/logo-vec-icon.png";
import { BrandsCarousel } from "../features/brands/components/BrandsCarousel";
import { useEffect, useState } from "react";
import { Icons } from "../shared/components/Icons";
import { WHATSAPP_URL } from "../shared/constants";
import { CommentModal } from "../features/comments/components/CommentModal";
import { PublicCommentsSection } from "../features/comments/components/PublicCommentsSection";
import { Timeline } from "../shared/components/Timeline";

export function HomePage() {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const featuredProducts = [
    {
      title: "Mouse Logitech M170 B",
      description:
        "Comodidad, precisión y conectividad inalámbrica para trabajar sin límites.",
      image: "/products/Mouse_Logitech_M170_B.png",
    },
    {
      title: "Impresora Epson L3250",
      description:
        "Impresiones de alta calidad con sistema continuo de tinta y conexión WiFi.",
      image: "/products/EPSON_L3250.png",
    },
    {
      title: "Kit de Limpieza Profesional",
      description: "Mantén tus equipos libres de polvo y en perfecto estado.",
      image: "/products/Kit_de_limpieza.png",
    },
  ];
  const bestSellers = [
    {
      name: "Teclado Logitech MK120",
      price: "S/. 49.90",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/teclados/KIT%20LOGITECH%20MK120.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvdGVjbGFkb3MvS0lUIExPR0lURUNIIE1LMTIwLndlYnAiLCJpYXQiOjE3Nzg5NTMwNDUsImV4cCI6MTkzNjYzMzA0NX0.JZbNzwxbV4CuWVX-2V5ZEFwUmB7uuIXEX9PYCEXs8uM",
    },
    {
      name: "Mouse Logitech M170 B",
      price: "S/. 59.90",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/mouse/Mouse%20Logitech%20M170%20B.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvbW91c2UvTW91c2UgTG9naXRlY2ggTTE3MCBCLndlYnAiLCJpYXQiOjE3ODAyNjM0NTgsImV4cCI6MTkzNzk0MzQ1OH0.TEgD6UavbOU_H5BgtQFpKii7OPEgwVnB-FxrpEaktO0",
    },
    {
      name: "Impresora Epson L3250",
      price: "S/. 799.00",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/impresoras/EPSON%20L3250.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvaW1wcmVzb3Jhcy9FUFNPTiBMMzI1MC53ZWJwIiwiaWF0IjoxNzgwMjYzNzYyLCJleHAiOjE5Mzc5NDM3NjJ9.pWYUPt3ks2URnIRYr95KOMH8dk5OaQJhP8WFLAWydZc",
    },
    {
      name: "Tintas Epson 504",
      price: "S/. 89.00",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/tintas/Tintas%20Epson%20T504.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvdGludGFzL1RpbnRhcyBFcHNvbiBUNTA0LndlYnAiLCJpYXQiOjE3ODAyNjY1MTAsImV4cCI6MTkzNzk0NjUxMH0.6iviqplyzUIu5m-S8G12McAbX1j-OlWunoyJd0rWzYM",
    },
    {
      name: "Kit de Limpieza",
      price: "S/. 29.90",
      image:
        "https://promart.vteximg.com.br/arquivos/ids/6484556-1000-1000/image-6d5978cf2b5e41e69f9951dfe39eec09.jpg?v=637970690968100000",
    },
  ];
  const categories = [
    {
      name: "Mouses",
      image: "/products/Mouse_Logitech_M170_B.png",
    },
    {
      name: "Teclados",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/teclados/KIT%20LOGITECH%20MK120.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvdGVjbGFkb3MvS0lUIExPR0lURUNIIE1LMTIwLndlYnAiLCJpYXQiOjE3Nzg5NTMwNDUsImV4cCI6MTkzNjYzMzA0NX0.JZbNzwxbV4CuWVX-2V5ZEFwUmB7uuIXEX9PYCEXs8uM",
    },
    {
      name: "Impresoras",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/impresoras/EPSON%20L3250.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvaW1wcmVzb3Jhcy9FUFNPTiBMMzI1MC53ZWJwIiwiaWF0IjoxNzgwMjYzNzYyLCJleHAiOjE5Mzc5NDM3NjJ9.pWYUPt3ks2URnIRYr95KOMH8dk5OaQJhP8WFLAWydZc",
    },
    {
      name: "Tintas",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/tintas/Tintas%20Epson%20T504.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvdGludGFzL1RpbnRhcyBFcHNvbiBUNTA0LndlYnAiLCJpYXQiOjE3ODAyNjY1MTAsImV4cCI6MTkzNzk0NjUxMH0.6iviqplyzUIu5m-S8G12McAbX1j-OlWunoyJd0rWzYM",
    },
    {
      name: "Kits de Limpieza",
      image:
        "https://promart.vteximg.com.br/arquivos/ids/6484556-1000-1000/image-6d5978cf2b5e41e69f9951dfe39eec09.jpg?v=637970690968100000",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <div className="pt-14">
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
        <div className="bg-[#eef2f5] min-h-screen">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* HERO */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative h-64 md:h-96 overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
                <img
                  src={featuredProducts[current].image}
                  alt={featuredProducts[current].title}
                  className={`absolute right-0 h-full w-full object-cover md:object-contain ${featuredProducts[current].title.includes("Mouse") ? "object-center md:max-w-[60%] md:max-h-[60%]" : "object-right"}`}
                />

                <div className="absolute inset-0 bg-linear-to-r from-[#00162f]/95 via-[#00162f]/80 to-transparent" />

                <div className="relative z-10 h-full flex items-center">
                  <div className="max-w-xl px-6 md:px-10 text-white">
                    <span className="uppercase tracking-wider text-[#3b9de8] font-semibold text-xs md:text-base">
                      Producto Destacado
                    </span>

                    <h1 className="text-2xl md:text-5xl font-bold mt-2 md:mt-4 leading-tight">
                      {featuredProducts[current].title}
                    </h1>

                    <p className="mt-3 md:mt-6 mb-4 md:mb-6 text-sm md:text-base text-white line-clamp-2 md:line-clamp-none">
                      {featuredProducts[current].description}
                    </p>

                    <Link
                      to={"/products"}
                      className="inline-block bg-[#0088d2] hover:bg-[#169de7] transition px-5 md:px-8 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base"
                    >
                      Ver Producto
                    </Link>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setCurrent(
                      current === 0 ? featuredProducts.length - 1 : current - 1,
                    )
                  }
                  className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2 md:p-3 rounded-full text-white text-sm md:text-base"
                >
                  ❮
                </button>

                <button
                  onClick={() =>
                    setCurrent((current + 1) % featuredProducts.length)
                  }
                  className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur p-2 md:p-3 rounded-full text-white text-sm md:text-base"
                >
                  ❯
                </button>
              </div>

              <div className="relative h-64 md:h-96 overflow-hidden rounded-xl md:rounded-2xl shadow-xl bg-[#0b1f3a] flex items-center justify-center">
                <video
                  className="h-full w-full object-contain"
                  autoPlay
                  controls
                  loop
                >
                  <source src="/video/video.mp4" />
                </video>
              </div>
            </section>
            {/* MISIÓN Y VISIÓN */}
            <section className="bg-white py-16 md:py-12">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12 md:mb-16">
                  <h2 className="text-3xl md:text-5xl font-bold text-[#0b1f3a]">
                    Nuestra Empresa
                  </h2>
                  <div className="w-20 h-1 bg-[#0088d2] mx-auto mt-4 rounded-full" />
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12">
                  <div className="bg-[#f8fafc] rounded-2xl p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-row items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-[#0088d2]/10 rounded-xl flex items-center justify-center mb-6">
                        <svg
                          className="w-7 h-7 text-[#0088d2]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1f3a] mb-4">
                        Misión
                      </h3>
                    </div>
                    <p className="text-black leading-relaxed text-base md:text-lg">
                      Ser la primera opción de nuestros clientes cuando piensan
                      en tecnología. Nos dedicamos a ofrecer productos de calidad,
                      atención personalizada y soluciones informáticas que realmente
                      resuelvan sus necesidades, porque sabemos que detrás de cada
                      equipo hay una persona, un emprendimiento o una familia que
                      confía en nosotros.
                    </p>
                  </div>

                  <div className="bg-[#f8fafc] rounded-2xl p-8 md:p-10 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-row items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-[#0088d2]/10 rounded-xl flex items-center justify-center mb-6">
                        <svg
                          className="w-7 h-7 text-[#0088d2]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-[#0b1f3a] mb-4">
                        Visión
                      </h3>
                    </div>
                    <p className="text-black leading-relaxed text-base md:text-lg">
                      Ser reconocidos como la primera opción de confianza para
                      nuestros clientes, donde cada persona se sienta respaldada
                      y asesorada en sus decisiones tecnológicas. Queremos
                      construir relaciones duraderas basadas en la honestidad,
                      el buen servicio y el compromiso genuino de ayudar a
                      quienes confían en nosotros.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            {/* MÁS VENDIDOS */}
            <section className="mt-10 md:mt-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-2">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-[#0b1f3a]">
                    Más Vendidos
                  </h2>
                  <p className="text-black mt-1 md:mt-2 text-sm md:text-base">
                    Los productos favoritos de nuestros clientes.
                  </p>
                </div>

                <Link
                  to={"/products"}
                  className="text-[#0088d2] font-medium text-sm md:text-base"
                >
                  Ver todos →
                </Link>
              </div>

              <div className="w-full max-w-full mx-auto px-3 sm:px-5 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                  {bestSellers.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="relative aspect-square overflow-hidden p-3 sm:p-4 flex items-center justify-center bg-slate-50">
                        <Link to={`/products`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className={`object-contain group-hover:scale-105 transition-transform duration-500 ${product.name.includes("Mouse") ? "max-w-[45%] max-h-[45%]" : "max-w-full max-h-full"}`}
                          />
                        </Link>
                      </div>

                      <div className="p-3 sm:p-4">
                        <h3 className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight truncate">
                          {product.name}
                        </h3>

                        <div className="flex justify-between items-center mt-3 mb-4 gap-2">
                          <p
                            className="
                            text-sm sm:text-lg lg:text-xl
                            font-black text-slate-900
                            whitespace-nowrap
                          "
                          >
                            {product.price}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2">
                          <button
                            className="
                            w-full border border-slate-300
                            hover:border-sky-500
                            hover:bg-sky-50
                            text-black hover:text-sky-600
                            font-semibold
                            text-xs sm:text-sm
                            py-2.5 sm:py-3
                            rounded-xl
                            transition-all
                            flex items-center justify-center gap-2
                          "
                          >
                            <Icons.Star />
                            Añadir al carrito
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-10 md:mt-20 bg-white rounded-xl md:rounded-2xl shadow-sm">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                <div className="p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🛡️</div>
                  <h3 className="font-bold text-base md:text-lg">
                    Garantía Asegurada
                  </h3>
                  <p className="text-black mt-2 text-sm md:text-base">
                    Productos con respaldo y garantía.
                  </p>
                </div>

                <div className="p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🎧</div>
                  <h3 className="font-bold text-base md:text-lg">
                    Soporte Técnico
                  </h3>
                  <p className="text-black mt-2 text-sm md:text-base">
                    Atención especializada.
                  </p>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-3 md:mt-4 items-center gap-2 text-[#25D366] font-semibold text-sm md:text-base"
                  >
                    <Icons.Whatsapp />
                    986 037 556
                  </a>
                </div>

                <div className="p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🔒</div>
                  <h3 className="font-bold text-base md:text-lg">
                    Compra Segura
                  </h3>
                  <p className="text-black mt-2 text-sm md:text-base">
                    Protección de datos y pagos seguros.
                  </p>
                </div>
              </div>
            </section>

            {/* CATEGORÍAS */}
            <section className="mt-10 md:mt-20 pb-10">
              <h2 className="text-2xl md:text-4xl font-bold text-[#0b1f3a] mb-6 md:mb-10">
                Explora nuestras categorías
              </h2>

              <div className="w-full max-w-full mx-auto px-3 sm:px-5 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <div className="relative aspect-square overflow-hidden p-3 sm:p-4 flex items-center justify-center bg-slate-50">
                        <Link to={`/products`}>
                          <img
                            src={category.image}
                            alt={category.name}
                            className={`object-contain group-hover:scale-105 transition-transform duration-500 ${category.name === "Mouses" ? "max-w-[60%] max-h-[60%]" : "max-w-full max-h-full"}`}
                          />
                        </Link>
                      </div>

                      <div className="p-3 sm:p-4">
                        <h3 className="font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight truncate">
                          {category.name}
                        </h3>

                        <div className="flex flex-col gap-2">
                          <Link
                            to={"/products"}
                            className="mt-2 text-[#0088d2] font-medium"
                          >
                            Ver productos →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
        <BrandsCarousel />

        <PublicCommentsSection />

        <Timeline />

        {/* Comentarios */}
        <button
          onClick={() => setShowCommentModal(true)}
          className="fixed bottom-6 left-6 z-40 bg-[#0088d2] hover:bg-[#169de7] text-white pl-4 pr-5 h-14 rounded-full shadow-2xl flex items-center justify-center gap-2.5 transition-all hover:scale-105 hover:shadow-[#0088d2]/25 animate-pulse shadow-[#0088d2]/20"
          aria-label="Dejar comentario"
        >
          <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-semibold whitespace-nowrap">Deja tu comentario</span>
        </button>

        <CommentModal
          open={showCommentModal}
          onClose={() => setShowCommentModal(false)}
        />
      </div>
    </div>
  );
}
