import { useProducts } from "../../../hooks/useProducts";
import { Icons } from "../../../components/Icons";
import { Link } from "react-router-dom";

export function ProductCard() {
  const products = useProducts();

  return (
    <div className="w-full max-w-450 mx-auto px-3 sm:px-5 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <Link
            to={`/product/${product.product_id}`}
            key={product.product_id}
            className=" bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="relative aspect-square overflow-hidden p-3 sm:p-4 flex items-center justify-center bg-slate-50">
              <picture>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </picture>
            </div>

            <div className="p-3 sm:p-4">
              <h3 className=" font-bold text-slate-800 group-hover:text-sky-600 transition-colors leading-tight truncate">
                {product.name}
              </h3>

              <div className="flex justify-between items-center mt-3 mb-4 gap-2">
                <span
                  className="
                text-[9px] sm:text-[10px]
                font-black uppercase tracking-wider
                bg-sky-50 text-sky-600
                px-2 py-1 rounded-lg
              "
                >
                  {product.category}
                </span>

                <p
                  className="
                text-sm sm:text-lg lg:text-xl
                font-black text-slate-900
                whitespace-nowrap
              "
                >
                  S/ {product.price.toFixed(2)}
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
          </Link>
        ))}
      </div>
    </div>
  );
}
