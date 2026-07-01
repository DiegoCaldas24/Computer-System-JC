interface Props {
  current?: number;
  total?: number;
  pageSize?: number;
  onChange?: (page: number) => void;
  page?: number;
  totalItems?: number;
  setPage?: (page: number) => void;
}

export function Pagination({
  current: c,
  total: t,
  pageSize: ps,
  onChange: oc,
  page,
  totalItems,
  setPage,
}: Props) {
  const current = c ?? page ?? 1;
  const total = t ?? totalItems ?? 0;
  const pageSize = ps ?? 10;
  const onChange = oc ?? setPage ?? (() => {});

  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4">
      <span className="text-sm text-black">
        {total} registro{total !== 1 ? "s" : ""}
      </span>
      <div className="flex gap-1.5">
        <button
          disabled={current <= 1}
          onClick={() => onChange(current - 1)}
          className="border border-slate-300 rounded-md text-xs font-semibold py-1.5 px-3 hover:bg-slate-100 transition disabled:opacity-40 disabled:pointer-events-none"
        >
          Anterior
        </button>
        {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`rounded-md text-xs font-semibold py-1.5 px-3 transition ${
              p === current
                ? "bg-[#1144b5] text-white"
                : "border border-slate-300 hover:bg-slate-100"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={current >= pages}
          onClick={() => onChange(current + 1)}
          className="border border-slate-300 rounded-md text-xs font-semibold py-1.5 px-3 hover:bg-slate-100 transition disabled:opacity-40 disabled:pointer-events-none"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}