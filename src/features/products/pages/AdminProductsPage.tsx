import { useEffect, useState } from "react";
import { Icons } from "../../../shared/components/Icons";
import { Pagination } from "../../../shared/components/Pagination";
import { useToast } from "../../../shared/hooks/useToast";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deactivateProduct,
  increaseStock,
  getLastProductCode,
  generateNextCode,
} from "../services/ProductService";
import { getAllCategories } from "../../categories/services/CategoryService";
import { getAllBrands } from "../../brands/services/BrandService";
import type { Product } from "../types/product";
import type { Category } from "../../categories/types/category";
import type { Brand } from "../../brands/types/brand";

const LABELS: Record<string, string> = {
  name: "Nombre",
  price: "Precio",
  stock: "Stock",
  category_id: "Categoría",
  brand_id: "Marca",
  description: "Descripción",
  image: "URL de imagen",
};

export default function AdminProductsPage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState<number | null>(null);
  const [showStockModal, setShowStockModal] = useState<number | null>(null);
  const [stockAmount, setStockAmount] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    description: "",
    image: "",
    category_id: "",
    brand_id: "",
  });

  const loadProducts = () =>
    getAllProducts()
      .then((data) => setProducts(data ?? []))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setLoading(false));

  useEffect(() => {
    let cancelled = false;
    loadProducts().then(() => {
      if (cancelled) return;
    });
    getAllCategories().then((data) => {
      if (!cancelled) setCategories(data ?? []);
    });
    getAllBrands().then((data) => {
      if (!cancelled) setBrands(data ?? []);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const total = products.length;
  const lowStock = products.filter((p) => (p.stock ?? 0) <= 5).length;
  const inventoryValue = products.reduce(
    (a, b) => a + Number(b.price) * Number(b.stock ?? 0),
    0,
  );

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      price: "",
      stock: "",
      description: "",
      image: "",
      category_id: "",
      brand_id: "",
    });
    setShowModal(true);
  };

  const openEdit = (product: Product) => {
    setEditing(product);
    setForm({
      name: product.name,
      price: String(product.price),
      stock: "",
      description: product.description ?? "",
      image: product.image ?? "",
      category_id: String(product.category_id ?? ""),
      brand_id: String(product.brand_id ?? ""),
    });
    setShowModal(true);
  };

  const save = async () => {
    if (!form.name.trim()) {
      toast("El nombre del producto es obligatorio", "warning");
      return;
    }

    try {
      if (editing) {
        await updateProduct(editing.product_id, {
          name: form.name,
          price: Number(form.price) || 0,
          description: form.description || undefined,
          image: form.image || undefined,
          category_id: Number(form.category_id) || undefined,
          brand_id: Number(form.brand_id) || undefined,
        });
        toast("Producto actualizado correctamente", "success");
      } else {
        const lastCode = await getLastProductCode();
        console.log("Last product code:", lastCode);
        const code = generateNextCode(lastCode);
        console.log("Generated code for new product:", code);
        const payload = {
          code,
          name: form.name,
          price: Number(form.price) || 0,
          stock: Number(form.stock) || 0,
          description: form.description || undefined,
          image: form.image || undefined,
          category_id: Number(form.category_id) || undefined,
          brand_id: Number(form.brand_id) || undefined,
          isActive: true,
        };
        await createProduct(payload);
        toast(`Producto ${code} creado correctamente`, "success");
      }
      setShowModal(false);
      setEditing(null);
      await loadProducts();
      setPage(1);
    } catch (err) {
      console.error("Error al guardar producto:", err);
      toast(
        err instanceof Error ? err.message : "Error al guardar producto",
        "error",
      );
    }
  };

  const increaseStockHandler = async () => {
    if (showStockModal === null) return;
    const amount = Number(stockAmount);
    if (!amount || amount <= 0) {
      toast("Ingresa una cantidad válida", "warning");
      return;
    }
    try {
      await increaseStock(showStockModal, amount);
      toast(`Stock aumentado en ${amount}`, "success");
      setShowStockModal(null);
      setStockAmount("");
      await loadProducts();
    } catch {
      toast("Error al aumentar stock", "error");
    }
  };

  const targetProduct =
    showConfirm !== null
      ? products.find((p) => p.product_id === showConfirm)
      : null;
  const isActivating = targetProduct?.isActive === false;

  const toggleActive = async () => {
    if (showConfirm === null) return;
    try {
      if (isActivating) {
        await updateProduct(showConfirm, { isActive: true });
        toast("Producto activado correctamente", "success");
      } else {
        await deactivateProduct(showConfirm);
        toast("Producto desactivado correctamente", "success");
      }
      setShowConfirm(null);
      await loadProducts();
    } catch {
      toast("Error al actualizar producto", "error");
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div className="relative">
          <Icons.Search />
          <input
            placeholder="Buscar producto"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-slate-300 rounded-lg pl-10 pr-4 py-2.5 text-sm w-72 outline-none focus:border-blue-500 transition"
          />
        </div>
        <button
          onClick={openCreate}
          className="bg-[#1144b5] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition flex items-center gap-2"
        >
          <Icons.Plus /> Añadir producto
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-5">Gestión de Productos</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Productos", value: total },
          { label: "Bajo Stock", value: lowStock },
          { label: "En Tránsito", value: "—" },
          { label: "Valor Inventario", value: `S/${inventoryValue}` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-white p-5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <small className="text-slate-500 text-xs">{label}</small>
            <h2 className="text-2xl font-bold mt-1">{value}</h2>
          </div>
        ))}
      </div>

      {loading ? (
        <p className="text-slate-500">Cargando productos...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    "Código",
                    "Producto",
                    "Categoría",
                    "Precio",
                    "Stock",
                    "Disponibilidad",
                    "Estado",
                    "Acciones",
                  ].map((h) => (
                    <th
                      key={h}
                      className="py-3 px-4 text-sm font-semibold text-slate-600"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((p) => (
                  <tr
                    key={p.product_id}
                    className={`border-b border-slate-100 hover:bg-[#f8f8f8] ${
                      p.isActive === false ? "opacity-50" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-mono text-xs text-slate-500">
                      {p.code}
                    </td>
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="py-3 px-4">
                      {p.category && typeof p.category === "object"
                        ? (p.category as { name: string }).name
                        : "-"}
                    </td>
                    <td className="py-3 px-4">S/{p.price}</td>
                    <td className="py-3 px-4">{p.stock ?? 0}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${
                          (p.stock ?? 0) <= 5 ? "bg-red-600" : "bg-green-600"
                        }`}
                      >
                        {(p.stock ?? 0) <= 5 ? "Bajo Stock" : "En Stock"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${
                          p.isActive === false ? "bg-slate-500" : "bg-green-600"
                        }`}
                      >
                        {p.isActive === false ? "Inactivo" : "Activo"}
                      </span>
                    </td>
                    <td className="py-3 px-4 flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                        disabled={p.isActive === false}
                      >
                        Editar
                      </button>
                      {p.isActive !== false && (
                        <button
                          onClick={() => {
                            setShowStockModal(p.product_id);
                            setStockAmount("");
                          }}
                          className="bg-cyan-600 hover:bg-cyan-700 text-white px-3 py-1.5 rounded text-xs font-medium transition"
                        >
                          + Stock
                        </button>
                      )}
                      <button
                        onClick={() => setShowConfirm(p.product_id)}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition ${
                          p.isActive === false
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : "bg-orange-500 hover:bg-orange-600 text-white"
                        }`}
                      >
                        {p.isActive === false ? "Activar" : "Desactivar"}
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No se encontraron productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="px-4 pb-2">
            <Pagination
              current={page}
              total={filtered.length}
              pageSize={pageSize}
              onChange={setPage}
            />
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div className="bg-white p-5 rounded-xl w-[420px] max-h-[85vh] overflow-y-auto">
            <h3 className="text-lg font-bold mb-3">
              {editing ? "Editar Producto" : "Nuevo Producto"}
            </h3>
            {(["name", "price"] as const).map((field) => (
              <label key={field} className="block mb-2.5">
                <span className="text-sm font-medium text-slate-700 mb-1 block">
                  {LABELS[field]}
                </span>
                <input
                  placeholder={LABELS[field]}
                  type={field === "price" ? "number" : "text"}
                  value={form[field]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [field]: e.target.value }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition"
                />
              </label>
            ))}
            <label className="block mb-2.5">
              <span className="text-sm font-medium text-slate-700 mb-1 block">
                {LABELS.description}
              </span>
              <textarea
                placeholder={LABELS.description}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={2}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition resize-none"
              />
            </label>

            <label className="block mb-2.5">
              <span className="text-sm font-medium text-slate-700 mb-1 block">
                URL de imagen
              </span>
              <input
                placeholder="https://ejemplo.com/imagen.jpg"
                type="text"
                value={form.image}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, image: e.target.value }))
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition"
              />
              {form.image && (
                <img
                  src={form.image}
                  alt="Preview"
                  className="mt-2 h-20 w-20 object-cover rounded-lg border border-slate-200"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </label>

            {editing ? (
              <label className="block mb-2.5">
                <span className="text-sm font-medium text-slate-700 mb-1 block">
                  Stock actual
                </span>
                <div className="w-full border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-sm text-slate-600">
                  {editing.stock ?? 0}
                </div>
              </label>
            ) : (
              <label className="block mb-2.5">
                <span className="text-sm font-medium text-slate-700 mb-1 block">
                  {LABELS.stock}
                </span>
                <input
                  placeholder={LABELS.stock}
                  type="number"
                  min={0}
                  value={form.stock}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, stock: e.target.value }))
                  }
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition"
                />
              </label>
            )}

            <label className="block mb-2.5">
              <span className="text-sm font-medium text-slate-700 mb-1 block">
                {LABELS.category_id}
              </span>
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category_id: e.target.value }))
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition bg-white"
              >
                <option value="">Sin categoría</option>
                {categories.map((c) => (
                  <option key={c.category_id} value={c.category_id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="block mb-2.5">
              <span className="text-sm font-medium text-slate-700 mb-1 block">
                {LABELS.brand_id}
              </span>
              <select
                value={form.brand_id}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, brand_id: e.target.value }))
                }
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 transition bg-white"
              >
                <option value="">Sin marca</option>
                {brands.map((b) => (
                  <option key={b.brand_id} value={b.brand_id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              onClick={save}
              className="bg-[#1144b5] hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition w-full mt-1"
            >
              Guardar
            </button>
          </div>
        </div>
      )}

      {showConfirm !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowConfirm(null);
          }}
        >
          <div className="bg-white p-6 rounded-xl w-[360px] text-center">
            <h3 className="text-lg font-bold mb-2">
              {isActivating ? "¿Activar producto?" : "¿Desactivar producto?"}
            </h3>
            <p className="text-sm text-slate-500 mb-5">
              {isActivating
                ? "El producto volverá a estar visible en la tienda."
                : "El producto dejará de estar visible en la tienda."}
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirm(null)}
                className="bg-gray-200 hover:bg-gray-300 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Cancelar
              </button>
              <button
                onClick={toggleActive}
                className={`px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActivating
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-orange-500 hover:bg-orange-600 text-white"
                }`}
              >
                {isActivating ? "Activar" : "Desactivar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showStockModal !== null && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowStockModal(null);
              setStockAmount("");
            }
          }}
        >
          <div className="bg-white p-6 rounded-xl w-[360px]">
            <h3 className="text-lg font-bold mb-4">Aumentar Stock</h3>

            <label className="block mb-4">
              <span className="text-sm font-medium text-slate-700 mb-1 block">
                Cantidad a agregar
              </span>
              <input
                type="number"
                placeholder="Ej: 10"
                value={stockAmount}
                onChange={(e) => setStockAmount(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition"
                autoFocus
              />
            </label>

            <button
              onClick={increaseStockHandler}
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition w-full"
            >
              Aumentar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
