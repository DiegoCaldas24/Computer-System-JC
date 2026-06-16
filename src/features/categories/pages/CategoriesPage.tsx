import { useEffect, useState } from "react";
import { Icons } from "../../../shared/components/Icons";
import { useToast } from "../../../shared/hooks/useToast";
import { Pagination } from "../../../shared/components/Pagination";
import { getAllCategories, createCategory } from "../services/CategoryService";
import type { Category } from "../types/category";

export default function CategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [name, setName] = useState("");

  const load = () =>
    getAllCategories()
      .then((data) => setCategories(data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));

  useEffect(() => {
    let cancelled = false;
    load().then(() => { if (cancelled) return; });
    return () => { cancelled = true; };
  }, []);

  const save = async () => {
    if (!name.trim()) {
      toast("El nombre de la categoría es obligatorio", "warning");
      return;
    }
    try {
      await createCategory(name.trim());
      toast("Categoría creada correctamente", "success");
      setShowModal(false);
      setName("");
      await load();
    } catch {
      toast("Error al crear categoría", "error");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Categorías</h1>
        <button
          onClick={() => { setName(""); setShowModal(true); }}
          className="bg-[#1144b5] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
        >
          <Icons.Plus /> Añadir categoría
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                {["Categoría", "Acciones"].map((h) => (
                  <th key={h} className="py-3 px-4 text-sm font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={2} className="py-8 text-center text-slate-400">Cargando...</td></tr>
              ) : categories.length === 0 ? (
                <tr><td colSpan={2} className="py-8 text-center text-slate-400">Sin categorías</td></tr>
              ) : (
                categories.slice((page - 1) * pageSize, page * pageSize).map((c) => (
                  <tr key={c.category_id} className="border-b border-slate-100 hover:bg-[#f8f8f8]">
                    <td className="py-3 px-4">{c.name}</td>
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
          <Pagination current={page} total={categories.length} pageSize={pageSize} onChange={setPage} />
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h3 className="text-lg font-bold mb-4">Nueva Categoría</h3>

            <label className="block mb-4">
              <span className="text-sm font-medium text-slate-700 mb-1 block">Nombre</span>
              <input
                placeholder="Nombre de la categoría"
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