import { useEffect, useState } from "react";
import { Icons } from "../../../shared/components/Icons";
import { useToast } from "../../../shared/hooks/useToast";
import { Pagination } from "../../../shared/components/Pagination";
import { getAllBrands, createBrand } from "../services/BrandService";
import type { Brand } from "../types/brand";

export default function BrandsPage() {
  const { toast } = useToast();
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [name, setName] = useState("");

  const load = () =>
    getAllBrands()
      .then((data) => setBrands(data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => {
    let cancelled = false;
    load().then(() => { if (cancelled) return; });
    return () => { cancelled = true; };
  }, []);

  const save = async () => {
    if (!name.trim()) {
      toast("El nombre de la marca es obligatorio", "warning");
      return;
    }
    try {
      await createBrand(name.trim());
      toast("Marca creada correctamente", "success");
      setShowModal(false);
      setName("");
      await load();
    } catch {
      toast("Error al crear marca", "error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Marcas</h1>
        <button
          onClick={() => { setName(""); setShowModal(true); }}
          className="bg-[#1144b5] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
        >
          <Icons.Plus /> Añadir marca
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                {["Marca", "Acciones"].map((h) => (
                  <th key={h} className="py-3 px-4 text-sm font-semibold text-black">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={2} className="py-8 text-center text-black">Cargando...</td></tr>
              ) : brands.length === 0 ? (
                <tr><td colSpan={2} className="py-8 text-center text-black">Sin marcas</td></tr>
              ) : (
                brands.slice((page - 1) * pageSize, page * pageSize).map((b) => (
                  <tr key={b.brand_id} className="border-b border-slate-100 hover:bg-[#f8f8f8]">
                    <td className="py-3 px-4">{b.name}</td>
                    <td className="py-3 px-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition">
                        Editar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 pb-2">
          <Pagination current={page} total={brands.length} pageSize={pageSize} onChange={setPage} />
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h3 className="text-lg font-bold mb-4">Nueva Marca</h3>

            <label className="block mb-4">
              <span className="text-sm font-medium text-black mb-1 block">Nombre</span>
              <input
                placeholder="Nombre de la marca"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition"
                autoFocus
              />
            </label>

            <button
              onClick={save}
              className="bg-[#1144b5] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition w-full"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}