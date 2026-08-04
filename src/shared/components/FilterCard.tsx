import { useState } from "react";

interface FilterItem {
  id: number;
  name: string;
}

interface Props {
  title: string;
  items: FilterItem[];
  selectedIds: number[];
  onToggle: (id: number, isChecked: boolean) => void;
  idPrefix: string;
  counts?: Record<number, number>;
}

export const FilterCard = ({
  title,
  items,
  selectedIds,
  onToggle,
  idPrefix,
  counts,
}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Móvil: diseño actual (acordeón + pills) */}
      <div className="md:hidden bg-[#0d1b36] border border-slate-200 rounded-2xl px-4 py-3 text-white transition-all">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center justify-between w-full"
        >
          <span className="text-white text-lg font-bold">{title}</span>
          <span
            className="text-white text-xl transition-transform duration-200"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          >
            ▾
          </span>
        </button>
        <div
          className={`flex flex-col gap-2 pt-3 overflow-hidden transition-all duration-300 ${open ? "max-h-96" : "max-h-0"}`}
        >
          {items.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            return (
              <label
                key={item.id}
                className={`
                  flex items-center gap-2 px-3 py-1.5 text-sm rounded-full border cursor-pointer transition
                  ${
                    isChecked
                      ? "bg-sky-600 text-white border-sky-500"
                      : "bg-white/10 text-white/80 border-white/20"
                  }
                `}
              >
                <input
                  type="checkbox"
                  id={`${idPrefix}-${item.id}`}
                  checked={isChecked}
                  onChange={(e) => onToggle(item.id, e.target.checked)}
                  className="cursor-pointer hidden"
                />
                <span>{item.name.toUpperCase()}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Desktop: diseño nuevo (tarjeta oscura con lista scrollable) */}
      <div className="hidden md:flex flex-col bg-[#132548] rounded-[18px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.18)]">
        <div className="px-5 py-4 border-b border-white/10">
          <h2 className="text-white text-2xl font-bold uppercase tracking-wide">
            {title}
          </h2>
        </div>
        <div className="overflow-y-auto max-h-96 px-4 py-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-[#3f5e92] [&::-webkit-scrollbar-thumb]:rounded-full">
          {items.map((item) => {
            const isChecked = selectedIds.includes(item.id);
            return (
              <label
                key={item.id}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-white cursor-pointer transition hover:bg-white/10 ${
                  isChecked ? "bg-white/10" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => onToggle(item.id, e.target.checked)}
                  className="w-[18px] h-[18px] accent-[#2b83ff] cursor-pointer"
                />
                <span className="flex-1 text-sm">{item.name}</span>
                {counts !== undefined && (
                  <span className="bg-white text-[#132548] px-2.5 py-0.5 rounded-full text-xs font-semibold">
                    {counts[item.id] ?? 0}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
    </>
  );
};
