import { Icons } from "../components/Icons";
import { ProductCard } from "../features/products/components/ProductCard";
import { CategoryCard } from "../features/categories/components/CategoryCard";

// --- Page: Products ---
export function ProductsPage() {
  return (
    <div className="pt-25 pb-24 px-4 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-8">
          <div>
            <p className="text-slate-500 text-lg">
              Lo mejor en hardware seleccionado por expertos.
            </p>
          </div>
          <div>
            <span className="text-slate-500 text-sm uppercase tracking-wide">
              Filtrar por categoría:
            </span>
            {/* Category card */}
            <CategoryCard />
          </div>
          <div className="relative group pt-2">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Icons.Search />
            </span>
            <input
              type="text"
              placeholder="Buscar modelos..."
              className="bg-white border border-slate-200 rounded-2xl pl-12 pr-6 py-4 text-slate-700 h-12 w-full md:w-80 shadow-sm focus:ring-2 focus:ring-sky-500 outline-none transition-all"
            />
          </div>
        </div>

        {/*Product cards*/}
        <ProductCard />
      </div>
    </div>
  );
}
