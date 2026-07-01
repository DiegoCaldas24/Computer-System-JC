import { useState, useMemo } from "react";
import { Carousel } from "../../../shared/components/Carousel";
import { ErrorState } from "../../../shared/components/ErrorState";
import { Pagination } from "../../../shared/components/Pagination";
import { BrandsCard } from "../../brands/components/BrandsCard";
import { CategoryCard } from "../../categories/components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import { useSearch } from "../../../shared/hooks/useSearch";
import logoWatermark from "../../../assets/logos/logo-vec-h-b.png";

const ITEMS_PER_PAGE = 8;

export function ProductsPage() {
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
  const { searchQuery } = useSearch();

  const { products: allProducts, error: productsError } = useProducts();

  const images = [
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMS53ZWJwIiwiaWF0IjoxNzc5MDQxMjI2LCJleHAiOjE5MzY3MjEyMjZ9.eCJpxYtAtWKZ-S4MFBo64bPM69QPaXnrT0JFieUjdOM",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMi53ZWJwIiwiaWF0IjoxNzc5MDQxMjM3LCJleHAiOjE5MzY3MjEyMzd9.BDV7cb50LQSZH1tvFkxMVjnKcvbBluyiRPndKL1qGxs",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMy53ZWJwIiwiaWF0IjoxNzc5MDQxMjQ5LCJleHAiOjE5MzY3MjEyNDl9.YMxsE3GBT07HGsMr8lk-3Zz4I16ux3HXU-CC7d0BWKQ",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/4.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvNC53ZWJwIiwiaWF0IjoxNzc5MDQxMjYxLCJleHAiOjE5MzY3MjEyNjF9.esCOBU0-1iAd5JvEJbeNOJOekK94c_fJAlaDTUM9b4k",
  ];

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    let result = allProducts.filter((p) => p.isActive !== false);

    if (query) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.category && typeof p.category === 'object' ? p.category.name : p.category ?? '').toLowerCase().includes(query),
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category_id || 0),
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) =>
        selectedBrands.includes(p.brand_id || 0),
      );
    }

    return result;
  }, [searchQuery, allProducts, selectedCategories, selectedBrands]);

  const hasSearched = searchQuery.trim().length > 0;

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handleCategoryChange = (categoryId: number, isChecked: boolean) => {
    setSelectedCategories((prev) => {
      if (isChecked) {
        return [...prev, categoryId];
      } else {
        return prev.filter((id) => id !== categoryId);
      }
    });
    setPage(1);
  };

  const handleBrandChange = (brandId: number, isChecked: boolean) => {
    setSelectedBrands((prev) => {
      if (isChecked) {
        return [...prev, brandId];
      } else {
        return prev.filter((id) => id !== brandId);
      }
    });
    setPage(1);
  };

  return (
    <div className="pt-14 pb-24 px-4 bg-white min-h-screen relative">
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
        {productsError && <ErrorState message={productsError} />}
        {!productsError && (<>
        <Carousel
          items={images}
          renderItem={(img) => (
            <div className="w-full h-full flex items-center justify-center p-0 sm:p-6">
              <img src={img} alt="" className="w-full h-full object-cover sm:object-contain" />
            </div>
          )}
          autoPlay
          interval={4000}
        />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-64 shrink-0 flex flex-col gap-4">
              <CategoryCard
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
              <BrandsCard
                selectedBrands={selectedBrands}
                onBrandChange={handleBrandChange}
              />
            </div>

            <div className="flex-1">
              <div className="mb-4 text-black">
                <p className="text-sm">
                  {hasSearched && filteredProducts.length === 0 && (
                    <>No se encontraron productos para "</>
                  )}
                  {hasSearched && filteredProducts.length > 0 && (
                    <>
                      Resultados para "
                      <span className="font-bold">{searchQuery}</span>" —{" "}
                    </>
                  )}
                  {filteredProducts.length > 0 && (
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
                </p>
              </div>

              {hasSearched && filteredProducts.length === 0 && (
                <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-black text-center">
                    No se encontraron productos
                  </p>
                </div>
              )}

              <ProductCard products={paginatedProducts} />

              {filteredProducts.length > 0 && (
                <Pagination
                  page={page}
                  totalItems={filteredProducts.length}
                  pageSize={ITEMS_PER_PAGE}
                  setPage={setPage}
                />
              )}
            </div>
          </div>
        </div>
        </>)}
      </div>
    </div>
  );
}