import { useState } from "react";
import { ErrorState } from "../../../shared/components/ErrorState";
import { Icons } from "../../../shared/components/Icons";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import { useCart } from "../../cart/context/CartContext";
import { useToast } from "../../../shared/hooks/useToast";
import logoWatermark from "../../../assets/logos/logo-vec-h-b.png";

export function ProductDetail() {
  const { product_id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { product, error } = useProduct(Number(product_id));
  const { addItem } = useCart();
  const { toast } = useToast();

  if (error) {
    return (
      <div className="md:pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto relative min-h-screen">
        <ErrorState message={error} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="md:pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto relative min-h-screen flex items-center justify-center">
        <p className="text-slate-400 text-lg">Cargando...</p>
      </div>
    );
  }
  return (
    <div className="md:pt-16 pb-20 px-4 md:px-6 max-w-7xl mx-auto relative">
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${logoWatermark})`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
          opacity: 0.2,
        }}
      />
      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-2 md:gap-4 mb-4">
          <Link
            to={"/products"}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-bold text-xs md:text-sm bg-white py-2 px-3 md:px-4 rounded-xl border border-slate-100 shadow-sm"
          >
            <Icons.ArrowLeft /> Volver
          </Link>
          <div className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1 md:gap-2 truncate max-w-[60%] md:max-w-none">
            <span className="hidden md:inline">Inicio</span> /{" "}
            <span>Productos</span> /{" "}
            <span className="truncate">{product?.category ? (typeof product.category === 'object' ? product.category.name : product.category) : ''}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-100 shadow-sm p-2 md:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-12">
            <div className="lg:col-span-6">
              <div className="bg-slate-50 rounded-2xl p-4 overflow-hidden aspect-square w-full flex items-center justify-center border border-slate-100">
                <img
                  src={product?.image}
                  className="w-full h-full object-cover"
                  alt={product?.name}
                />
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-baseline">
              <div className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {product?.category ? (typeof product.category === 'object' ? product.category.name : product.category) : ''}
                  </span>
                  <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                    {product?.name}
                  </h1>
                  <p className="text-xs md:text-sm text-slate-400 font-bold uppercase">
                    Marca:{" "}
                    <span className="text-slate-700">{product?.brand ? (typeof product.brand === 'object' ? product.brand.name : product.brand) : '-'}</span>
                  </p>
                </div>

                <div className="text-2xl md:text-3xl font-black text-blue-600">
                  ${product?.price}
                  <span className="text-[10px] md:text-xs text-slate-400 font-medium block mt-1">
                    Precio sugerido con IGV incluido
                  </span>
                </div>

                <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                  {product?.description}
                </p>

                <div className="border-t border-b border-slate-100 my-2 grid grid-cols-3 gap-2 md:gap-4">
                  <div className="flex flex-col items-center text-center p-1.5 md:p-2 bg-slate-50 rounded-xl">
                    <div className="text-blue-600 mb-1 md:mb-2">
                      <Icons.Truck />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-800">
                      Envío Gratis
                    </span>
                    <span className="text-[9px] md:text-[10px] text-slate-400">
                      Todo el país
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-1.5 md:p-2 bg-slate-50 rounded-xl">
                    <div className="text-blue-600 mb-1 md:mb-2">
                      <Icons.Shield />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-800">
                      12 Meses
                    </span>
                    <span className="text-[9px] md:text-[10px] text-slate-400">
                      Garantía Real
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-1.5 md:p-2 bg-slate-50 rounded-xl">
                    <div className="text-blue-600 mb-1 md:mb-2">
                      <Icons.RotateCcw />
                    </div>
                    <span className="text-[10px] md:text-xs font-bold text-slate-800">
                      Devoluciones
                    </span>
                    <span className="text-[9px] md:text-[10px] text-slate-400">
                      Hasta 30 días
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4 pt-2">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-6">
                  <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-2 md:p-3 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Icons.Minus />
                    </button>
                    <span className="px-4 md:px-6 font-bold text-slate-800 text-base md:text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="p-2 md:p-3 text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                      <Icons.Plus />
                    </button>
                  </div>
                  <div className="text-[10px] md:text-xs text-slate-400 font-medium">
                    <span className="text-emerald-500 font-bold block">
                      ✓ Stock Disponible
                    </span>
                    Entrega express disponible en 24 horas
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (product) { addItem(product, quantity); toast("Producto añadido al carrito", "success"); }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 rounded-xl md:rounded-2xl shadow-lg shadow-blue-100 transition-all text-center flex items-center justify-center gap-3 text-sm md:text-base"
                >
                  <Icons.ShoppingBag /> Añadir al carrito — ${product?.price}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
