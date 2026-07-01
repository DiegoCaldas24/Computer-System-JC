import { useState } from "react";
import { useBrands } from "../hooks/useBrands";

interface Props {
  selectedBrands: number[];
  onBrandChange: (brandId: number, isChecked: boolean) => void;
}

export const BrandsCard = ({ selectedBrands, onBrandChange }: Props) => {
  const { brands } = useBrands();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0d1b36] border border-slate-200 rounded-2xl px-4 py-3 text-white transition-all">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between w-full md:cursor-default"
      >
        <span className="text-white text-lg md:text-2xl font-bold">
          MARCAS
        </span>
        <span
          className="text-white text-xl md:hidden transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </button>
      <div
        className={`flex md:flex-col gap-2 pt-3 flex-wrap overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0 md:max-h-96"}`}
      >
        {brands.map((brand) => {
          const isChecked = selectedBrands.includes(brand.brand_id);
          return (
            <label
              key={brand.brand_id}
              className={`
                flex items-center gap-2 cursor-pointer transition rounded-lg
                md:px-0 md:py-0 md:bg-transparent
                px-3 py-1.5 text-sm rounded-full border
                ${
                  isChecked
                    ? "bg-sky-600 text-white border-sky-500 md:bg-transparent md:text-white md:border-0"
                    : "bg-white/10 text-white/80 border-white/20 md:bg-transparent md:text-white md:border-0"
                }
              `}
            >
              <input
                type="checkbox"
                id={`brand-${brand.brand_id}`}
                checked={isChecked}
                onChange={(e) =>
                  onBrandChange(brand.brand_id, e.target.checked)
                }
                className="cursor-pointer hidden md:block"
              />
              <span>{brand.name.toUpperCase()}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
