import { useState, useMemo, useRef, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Carousel } from "../components/Carousel";
import { Pagination } from "../components/Pagination";
import { CategoryCard } from "../features/categories/components/CategoryCard";
import { ProductCard } from "../features/products/components/ProductCard";
import { useProducts, useSearchProducts } from "../hooks/useProducts";
import logoWatermark from "../assets/logo-vec-icon.png";

const ITEMS_PER_PAGE = 8;

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  // Cargar todos los productos si no hay búsqueda
  const allProducts = useProducts();

  // Buscar en BD si hay query
  const { products: searchResults, loading: searchLoading } = useSearchProducts(
    searchQuery,
    selectedCategories.length > 0 ? selectedCategories : undefined,
  );

  const images = [
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMS53ZWJwIiwiaWF0IjoxNzc5MDQxMjI2LCJleHAiOjE5MzY3MjEyMjZ9.eCJpxYtAtWKZ-S4MFBo64bPM69QPaXnrT0JFieUjdOM",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMi53ZWJwIiwiaWF0IjoxNzc5MDQxMjM3LCJleHAiOjE5MzY3MjEyMzd9.BDV7cb50LQSZH1tvFkxMVjnKcvbBluyiRPndKL1qGxs",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMy53ZWJwIiwiaWF0IjoxNzc5MDQxMjQ5LCJleHAiOjE5MzY3MjEyNDl9.YMxsE3GBT07HGsMr8lk-3Zz4I16ux3HXU-CC7d0BWKQ",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/4.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvNC53ZWJwIiwiaWF0IjoxNzc5MDQxMjYxLCJleHAiOjE5MzY3MjEyNjF9.esCOBU0-1iAd5JvEJbeNOJOekK94c_fJAlaDTUM9b4k",
  ];

  // Determinar qué productos mostrar: búsqueda en BD o todos con filtro local
  const { filteredProducts, hasSearched, isEmptySearch } = useMemo(() => {
    if (searchQuery.trim()) {
      // Si hay búsqueda (no vacía), usar resultados de la BD
      return {
        filteredProducts: searchResults,
        hasSearched: true,
        isEmptySearch: false,
      };
    } else if (searchQuery && searchQuery.length > 0) {
      // Si searchQuery existe pero está vacío (solo espacios), mostrar TODOS los productos con mensaje
      if (selectedCategories.length === 0) {
        return {
          filteredProducts: allProducts,
          hasSearched: true,
          isEmptySearch: true,
        };
      }
      return {
        filteredProducts: allProducts.filter((product) =>
          selectedCategories.includes(product.category_id || 0),
        ),
        hasSearched: true,
        isEmptySearch: true,
      };
    } else {
      // Si no hay búsqueda en la URL, filtrar por categoría en memoria
      if (selectedCategories.length === 0) {
        return {
          filteredProducts: allProducts,
          hasSearched: false,
          isEmptySearch: false,
        };
      }
      return {
        filteredProducts: allProducts.filter((product) =>
          selectedCategories.includes(product.category_id || 0),
        ),
        hasSearched: false,
        isEmptySearch: false,
      };
    }
  }, [searchQuery, searchResults, allProducts, selectedCategories]);

  // Calcular paginación
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Resetear página cuando cambian las categorías
  const handleCategoryChange = (categoryId: number, isChecked: boolean) => {
    setSelectedCategories((prev) => {
      if (isChecked) {
        return [...prev, categoryId];
      } else {
        return prev.filter((id) => id !== categoryId);
      }
    });
    setPage(1); // Resetear a la primera página
  };
  const prevSearchQuery = useRef(searchQuery);
  // Resetear página cuando cambia la búsqueda
  useEffect(() => {
    if (prevSearchQuery.current !== searchQuery) {
      prevSearchQuery.current = searchQuery;
      setPage(1);
    }
  }, [searchQuery]);

  return (
    <div className="pt-14 pb-24 px-4 bg-slate-50 min-h-screen relative">
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
        <Carousel images={images} autoPlay interval={4000} />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Categoría card - Sidebar */}
            <div className="w-full md:w-64 shrink-0">
              <CategoryCard
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
            </div>

            {/* Productos y paginación */}
            <div className="flex-1">
              {/* Mostrar cantidad de productos encontrados */}
              <div className="mb-4 text-slate-600">
                <p className="text-sm">
                  {searchQuery && hasSearched && isEmptySearch && (
                    <>No se encontraron productos </>
                  )}
                  {searchQuery && hasSearched && !isEmptySearch && (
                    <>
                      Resultados para "
                      <span className="font-bold">{searchQuery}</span>"{" "}
                    </>
                  )}
                  {searchLoading ? (
                    <span>Buscando...</span>
                  ) : (
                    <>
                      {!hasSearched && (
                        <>
                          Mostrando{" "}
                          <span className="font-bold">
                            {paginatedProducts.length}
                          </span>{" "}
                          de{" "}
                          <span className="font-bold">
                            {filteredProducts.length}
                          </span>{" "}
                          productos
                        </>
                      )}
                      {hasSearched &&
                        !isEmptySearch &&
                        filteredProducts.length > 0 && (
                          <>
                            Mostrando{" "}
                            <span className="font-bold">
                              {paginatedProducts.length}
                            </span>{" "}
                            de{" "}
                            <span className="font-bold">
                              {filteredProducts.length}
                            </span>{" "}
                            productos
                          </>
                        )}
                      {hasSearched && isEmptySearch && (
                        <>
                          Mostrando{" "}
                          <span className="font-bold">
                            {paginatedProducts.length}
                          </span>{" "}
                          de{" "}
                          <span className="font-bold">
                            {filteredProducts.length}
                          </span>{" "}
                          productos
                        </>
                      )}
                    </>
                  )}
                </p>
              </div>

              {/* Mostrar mensaje especial cuando la búsqueda está vacía */}
              {hasSearched && isEmptySearch && !searchLoading && (
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-slate-600 text-center">
                    No se encontraron productos
                  </p>
                </div>
              )}

              {/* Product cards */}
              <ProductCard products={paginatedProducts} />

              {/* Pagination */}
              {filteredProducts.length > 0 && (
                <Pagination
                  page={page}
                  totalItems={filteredProducts.length}
                  setPage={setPage}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
