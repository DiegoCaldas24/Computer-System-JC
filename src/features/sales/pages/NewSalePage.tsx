import { useState } from "react";
import { getProductByCode } from "../../products/services/ProductService";
import { useToast } from "../../../shared/hooks/useToast";

type ProductoEncontrado = {
  product_id: number;
  code: string;
  name: string;
  price: number;
  stock: number;
};

type CarritoItem = ProductoEncontrado & { cantidad: number };

const inputClass =
  "w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-blue-500 transition";

export default function NewSalePage() {
  const { toast } = useToast();
  const [codigo, setCodigo] = useState("");
  const [actual, setActual] = useState<ProductoEncontrado | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [carrito, setCarrito] = useState<CarritoItem[]>([]);

  const buscar = async () => {
    const c = codigo.trim();
    if (!c) {
      toast("Ingrese un código de producto", "warning");
      return;
    }

    setBuscando(true);
    try {
      const prod = await getProductByCode(c);
      if (!prod) {
        toast("Producto no encontrado", "warning");
        return;
      }
      setActual(prod);
    } catch (err) {
      console.error("Error al buscar producto:", err);
      toast("Error al buscar el producto", "error");
    } finally {
      setBuscando(false);
    }
  };

  const agregar = () => {
    if (!actual) {
      toast("Busque un producto", "warning");
      return;
    }
    setCarrito((prev) => {
      const existente = prev.find(
        (x) => x.product_id === actual.product_id,
      );
      if (existente) {
        return prev.map((x) =>
          x.product_id === actual.product_id
            ? { ...x, cantidad: x.cantidad + 1 }
            : x,
        );
      }
      return [...prev, { ...actual, cantidad: 1 }];
    });
    setCodigo("");
    setActual(null);
  };

  const cambiarCantidad = (product_id: number, c: number) => {
    setCarrito((prev) =>
      prev.map((x) =>
        x.product_id === product_id ? { ...x, cantidad: c } : x,
      ),
    );
  };

  const eliminar = (product_id: number) => {
    setCarrito((prev) => prev.filter((x) => x.product_id !== product_id));
  };

  const total = carrito.reduce((t, p) => t + p.price * p.cantidad, 0);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Registrar Venta</h1>

      <div className="mb-5">
        <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
          <h3 className="text-sm font-semibold text-black mb-3">
            Buscar Producto
          </h3>

          <div className="flex gap-3 mb-4">
            <input
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscar()}
              placeholder="Código"
              className={inputClass}
            />
            <button
              onClick={buscar}
              disabled={buscando}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium cursor-pointer disabled:opacity-50"
            >
              {buscando ? "Buscando..." : "Buscar"}
            </button>
            <button
              onClick={agregar}
              className="px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium cursor-pointer"
            >
              Agregar
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-slate-50 rounded-lg p-3">
              <b className="block text-xs text-slate-500 mb-1">Producto</b>
              <div className="text-sm text-black">
                {actual ? actual.name : "-"}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <b className="block text-xs text-slate-500 mb-1">Precio</b>
              <div className="text-sm text-black">
                S/. {(actual ? actual.price : 0).toFixed(2)}
              </div>
            </div>
            <div className="bg-slate-50 rounded-lg p-3">
              <b className="block text-xs text-slate-500 mb-1">Stock</b>
              <div className="text-sm text-black">{actual ? actual.stock : 0}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-5">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-800 text-white">
                {["Código", "Producto", "Precio", "Cant.", "Subtotal", ""].map(
                  (h) => (
                    <th key={h} className="py-3 px-4 text-sm font-medium">
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {carrito.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-black text-sm">
                    No hay productos en la venta
                  </td>
                </tr>
              ) : (
                carrito.map((p) => (
                  <tr key={p.product_id} className="border-b border-slate-100 text-center">
                    <td className="py-3 px-4 text-sm">{p.code}</td>
                    <td className="py-3 px-4 text-sm">{p.name}</td>
                    <td className="py-3 px-4 text-sm">S/. {p.price.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min={1}
                        value={p.cantidad}
                        onChange={(e) =>
                          cambiarCantidad(
                            p.product_id,
                            Math.max(1, parseInt(e.target.value) || 1),
                          )
                        }
                        className="w-20 border border-slate-300 rounded-md px-2 py-1 text-sm outline-none"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm">
                      S/. {(p.price * p.cantidad).toFixed(2)}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => eliminar(p.product_id)}
                        className="px-3 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs cursor-pointer"
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-5 text-right">
          <div className="text-3xl font-bold text-black">
            TOTAL: S/. {total.toFixed(2)}
          </div>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold cursor-pointer"
          >
            Registrar Venta
          </button>
        </div>
      </div>
    </div>
  );
}
