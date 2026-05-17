import { useState } from "react";
import { Icons } from "../components/Icons";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";

export function ProductDetail() {
  const { product_id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const product = useProduct(Number(product_id));
  return (
    <div className="pt-20 pb-20 px-6 max-w-7xl mx-auto">
      {/* Botón de retroceso & Migajas de pan */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <Link
          to={"/products"}
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors font-bold text-sm bg-white py-2 px-4 rounded-xl border border-slate-100 shadow-sm"
        >
          <Icons.ArrowLeft /> Volver al catálogo
        </Link>
        <div className="text-xs text-slate-400 font-bold uppercase tracking-wider flex items-center gap-2">
          <span>Inicio</span> / <span>Productos</span> /{" "}
          <span>{product?.category}</span> /{" "}
          <span className="text-slate-800">{product?.name}</span>
        </div>
      </div>

      {/* Grid del Producto */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-2 md:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Columna Izquierda: Imagen */}
          <div className="lg:col-span-6 h-120">
            <div className="bg-slate-50 rounded-2xl p-4 overflow-hidden aspect-square w-full h-118 flex items-center justify-center border border-slate-100">
              <img
                src={product?.image}
                className="w-full h-full object-cover"
                alt={product?.name}
              />
            </div>
          </div>

          {/* Columna Derecha: Detalles */}
          <div className="lg:col-span-6 flex flex-col justify-baseline">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product?.category}
                </span>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">
                  {product?.name}
                </h1>
                <p className="text-sm text-slate-400 font-bold uppercase">
                  Marca: <span className="text-slate-700">marca</span>
                </p>
              </div>

              <div className="text-3xl font-black text-blue-600">
                ${product?.price}
                <span className="text-xs text-slate-400 font-medium block mt-1">
                  Precio sugerido con IGV incluido
                </span>
              </div>

              <p className="text-slate-600 text-base leading-relaxed">
                {product?.description}
              </p>

              {/* Características Clave de la Tienda */}
              <div className="border-t border-b border-slate-100 my-2 grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-2 bg-slate-50 rounded-xl">
                  <div className="text-blue-600 mb-2">
                    <Icons.Truck />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    Envío Gratis
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Todo el país
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-2 bg-slate-50 rounded-xl">
                  <div className="text-blue-600 mb-2">
                    <Icons.Shield />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    12 Meses
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Garantía Real
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-2 bg-slate-50 rounded-xl">
                  <div className="text-blue-600 mb-2">
                    <Icons.RotateCcw />
                  </div>
                  <span className="text-xs font-bold text-slate-800">
                    Devoluciones
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Hasta 30 días
                  </span>
                </div>
              </div>
            </div>

            {/* Acciones de Compra */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-6">
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-3 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <Icons.Minus />
                  </button>
                  <span className="px-6 font-bold text-slate-800 text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-3 text-slate-600 hover:bg-slate-200 transition-colors"
                  >
                    <Icons.Plus />
                  </button>
                </div>
                <div className="text-xs text-slate-400 font-medium">
                  <span className="text-emerald-500 font-bold block">
                    ✓ Stock Disponible
                  </span>
                  Entrega express disponible en 24 horas
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-100 transition-all text-center flex items-center justify-center gap-3">
                <Icons.ShoppingBag /> Añadir al carrito — ${product?.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
