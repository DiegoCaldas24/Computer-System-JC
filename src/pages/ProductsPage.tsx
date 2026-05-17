import { Carousel } from "../components/Carousel";
import { Icons } from "../components/Icons";
import { CategoryCard } from "../features/categories/components/CategoryCard";
import { ProductCard } from "../features/products/components/ProductCard";

export function ProductsPage() {
  const images = [
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/1.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMS53ZWJwIiwiaWF0IjoxNzc5MDQxMjI2LCJleHAiOjE5MzY3MjEyMjZ9.eCJpxYtAtWKZ-S4MFBo64bPM69QPaXnrT0JFieUjdOM",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/2.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMi53ZWJwIiwiaWF0IjoxNzc5MDQxMjM3LCJleHAiOjE5MzY3MjEyMzd9.BDV7cb50LQSZH1tvFkxMVjnKcvbBluyiRPndKL1qGxs",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/3.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvMy53ZWJwIiwiaWF0IjoxNzc5MDQxMjQ5LCJleHAiOjE5MzY3MjEyNDl9.YMxsE3GBT07HGsMr8lk-3Zz4I16ux3HXU-CC7d0BWKQ",
    "https://qoqkfefgnvgrfeorwteh.supabase.co/storage/v1/object/sign/images-logos/4.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kNmM0NDM3OC0wMmM4LTQ0OTMtYjVlMS0xMmE2ZDQ5N2M0ZjAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZXMtbG9nb3MvNC53ZWJwIiwiaWF0IjoxNzc5MDQxMjYxLCJleHAiOjE5MzY3MjEyNjF9.esCOBU0-1iAd5JvEJbeNOJOekK94c_fJAlaDTUM9b4k",
  ];
  return (
    <div className="pt-17 pb-24 px-4 bg-slate-50 min-h-screen">
      <Carousel images={images} autoPlay interval={4000} />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-8">
          <div className="pl-7">
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
