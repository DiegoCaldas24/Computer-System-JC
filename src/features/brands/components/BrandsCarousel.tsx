const brands = [
  {
    name: "Logitech",
    logo: "/brands/image_marcas_0.png",
  },
  {
    name: "MSI",
    logo: "/brands/image_marcas_1.webp",
  },
  {
    name: "Canon",
    logo: "/brands/image_marcas_2.webp",
  },
  {
    name: "Brother",
    logo: "/brands/image_marcas_3.webp",
  },
  {
    name: "Samsung",
    logo: "/brands/image_marcas_4.webp",
  },
  {
    name: "Micronics",
    logo: "/brands/image_marcas_5.jpg",
  },
  {
    name: "AMD",
    logo: "/brands/image_marcas_6.webp",
  },
  {
    name: "CORSAIR",
    logo: "/brands/image_marcas_7.webp",
  },
  {
    name: "FORZA",
    logo: "/brands/image_marcas_8.webp",
  },
];

export function BrandsCarousel() {
  const duplicatedBrands = [...brands, ...brands];

  return (
    <section className="relative overflow-hidden bg-white py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Marcas Aliadas</h2>

          <p className="mt-3 text-black">
            Trabajamos con las principales marcas del mercado
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent" />

          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-white to-transparent" />

          <div className="flex marquee min-w-max items-center">
            {duplicatedBrands.map((brand, index) => (
              <div
                key={index}
                className="
                  mx-6
                  flex
                  h-24
                  w-32
                  shrink-0
                  items-center
                  justify-center
                  sm:w-40
                  md:w-48
                "
              >
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="
                    max-h-12
                    w-auto
                    object-contain
                    grayscale
                    opacity-70
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:grayscale-0
                    hover:opacity-100
                  "
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}