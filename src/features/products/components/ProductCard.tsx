import { Icons } from "../../../shared/components/Icons";
import { Link } from "react-router-dom";
import { useCart } from "../../cart/context/CartContext";
import { useToast } from "../../../shared/hooks/useToast";
import type { Product } from "../types/product";

interface Props {
  products: Product[];
}

export function ProductCard({ products }: Props) {
  const { addItem } = useCart();
  const { toast } = useToast();
  return (
    <div className="w-full max-w-full mx-auto px-3 sm:px-5 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products && products.length > 0 ? (
          products.map((product: Product) => (
            <div
              key={product.product_id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="relative aspect-square overflow-hidden p-3 sm:p-4 flex items-center justify-center bg-slate-50">
                <Link to={`/product/${product.product_id}`}>
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
                  <span
                    className="
                  text-[9px] sm:text-[10px]
                  font-black uppercase tracking-wider
                  bg-sky-50 text-sky-600
                  px-2 py-1 rounded-lg
                "
                  >
                    {product.category ? (typeof product.category === 'object' ? product.category.name : product.category) : ''}
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
                    onClick={() => { addItem(product); toast("Producto añadido al carrito", "success"); }}
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
          ))
        ) : (
          <div className="col-span-2 lg:col-span-4 py-12 text-center">
            <p className="text-slate-800 text-lg">
              No hay productos disponibles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}