import { Link } from "react-router-dom";
import logoWatermark from "../assets/logo-vec-icon.png";
import { BrandsCarousel } from "../components/BrandsCarousel";
import { useEffect, useState } from "react";
import { Icons } from "../components/Icons";

export function HomePage() {
  const featuredProducts = [
    {
      title: "Mouse Logitech M170 B",
      description:
        "Comodidad, precisión y conectividad inalámbrica para trabajar sin límites.",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/mouse/Mouse%20Logitech%20M170%20B.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvbW91c2UvTW91c2UgTG9naXRlY2ggTTE3MCBCLndlYnAiLCJpYXQiOjE3ODAyNjM0NTgsImV4cCI6MTkzNzk0MzQ1OH0.TEgD6UavbOU_H5BgtQFpKii7OPEgwVnB-FxrpEaktO0",
    },
    {
      title: "Impresora Epson L3250",
      description:
        "Impresiones de alta calidad con sistema continuo de tinta y conexión WiFi.",
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/impresoras/EPSON%20L3250.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvaW1wcmVzb3Jhcy9FUFNPTiBMMzI1MC53ZWJwIiwiaWF0IjoxNzgwMjYzNzYyLCJleHAiOjE5Mzc5NDM3NjJ9.pWYUPt3ks2URnIRYr95KOMH8dk5OaQJhP8WFLAWydZc",
    },
    {
      title: "Kit de Limpieza Profesional",
      description: "Mantén tus equipos libres de polvo y en perfecto estado.",
      image:
        "https://promart.vteximg.com.br/arquivos/ids/6484556-1000-1000/image-6d5978cf2b5e41e69f9951dfe39eec09.jpg?v=637970690968100000",
    },
  ];
  const bestSellers = [
    {
      name: "Mouse Logitech M185",
      price: "S/. 49.90",
      image:
        "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600",
    },
    {
      name: "Teclado Logitech K120",
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
      image:
        "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-products/mouse/Mouse%20Logitech%20M170%20B.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtcHJvZHVjdHMvbW91c2UvTW91c2UgTG9naXRlY2ggTTE3MCBCLndlYnAiLCJpYXQiOjE3ODAyNjM0NTgsImV4cCI6MTkzNzk0MzQ1OH0.TEgD6UavbOU_H5BgtQFpKii7OPEgwVnB-FxrpEaktO0",
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
            <section className="relative h-80 md:h-135.5 items-center justify-end overflow-hidden rounded-xl md:rounded-2xl shadow-xl">
              <img
                src={featuredProducts[current].image}
                alt={featuredProducts[current].title}
                className="absolute right-0 h-full w-full md:max-w-[65%] max-w-full object-cover md:object-contain object-right"
              />

              <div className="absolute inset-0 bg-linear-to-r from-[#00162f]/95 via-[#00162f]/80 to-[#00162f]/40 md:to-transparent" />

              <div className="relative z-10 h-full flex items-center">
                <div className="max-w-xl px-6 md:px-16 text-white">
                  <span className="uppercase tracking-wider text-[#3b9de8] font-semibold text-xs md:text-base">
                    Producto Destacado
                  </span>

                  <h1 className="text-2xl md:text-6xl font-bold mt-2 md:mt-4 leading-tight">
                    {featuredProducts[current].title}
                  </h1>

                  <p className="mt-3 md:mt-6 mb-4 md:mb-6 text-sm md:text-lg text-gray-200 line-clamp-2 md:line-clamp-none">
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
            </section>

            {/* MÁS VENDIDOS */}
            <section className="mt-10 md:mt-16">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-2">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-[#0b1f3a]">
                    Más Vendidos
                  </h2>
                  <p className="text-gray-500 mt-1 md:mt-2 text-sm md:text-base">
                    Los productos favoritos de nuestros clientes.
                  </p>
                </div>

                <Link to={"/products"} className="text-[#0088d2] font-medium text-sm md:text-base">
                  Ver todos →
                </Link>
              </div>

              <div className="w-full max-w-full mx-auto px-3 sm:px-5 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
                  {bestSellers && bestSellers.length > 0 ? (
                    bestSellers.map((product) => (
                      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="relative aspect-square overflow-hidden p-3 sm:p-4 flex items-center justify-center bg-slate-50">
                          <Link to={`/products`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
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
                            text-slate-700 hover:text-sky-600
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
                    ))
                  ) : (
                    <div className="col-span-2 lg:col-span-4 py-12 text-center">
                      <p className="text-slate-500 text-lg">
                        No hay productos disponibles
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            <section className="mt-10 md:mt-20 bg-white rounded-xl md:rounded-2xl shadow-sm">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                <div className="p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🛡️</div>
                  <h3 className="font-bold text-base md:text-lg">Garantía Asegurada</h3>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
                    Productos con respaldo y garantía.
                  </p>
                </div>

                <div className="p-6 md:p-8 text-center">
                  <div className="text-4xl md:text-5xl mb-3 md:mb-4">🎧</div>
                  <h3 className="font-bold text-base md:text-lg">Soporte Técnico</h3>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">Atención especializada.</p>

                  <a
                    href="https://wa.me/51986037556"
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
                  <h3 className="font-bold text-base md:text-lg">Compra Segura</h3>
                  <p className="text-gray-600 mt-2 text-sm md:text-base">
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
                  {categories && categories.length > 0 ? (
                    categories.map((category) => (
                      <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                        <div className="relative aspect-square overflow-hidden p-3 sm:p-4 flex items-center justify-center bg-slate-50">
                          <Link to={`/products`}>
                            <img
                              src={category.image}
                              alt={category.name}
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
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
                    ))
                  ) : (
                    <div className="col-span-2 lg:col-span-4 py-12 text-center">
                      <p className="text-slate-500 text-lg">
                        No hay productos disponibles
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
        <BrandsCarousel />
      </div>
    </div>
  );
}
