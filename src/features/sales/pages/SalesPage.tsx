import { useEffect, useState } from "react";
import { Pagination } from "../../../shared/components/Pagination";
import { getRecentOrders } from "../../orders/services/OrderService";

type Order = {
  order_id: number;
  customer_name?: string;
  total: number;
  status: string;
  created_at: string;
};

const statusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "entregado":
    case "completado":
      return "bg-green-100 text-green-800";
    case "pendiente":
      return "bg-yellow-100 text-yellow-800";
    case "cancelado":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function SalesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    getRecentOrders()
      .then((data) => setOrders(data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Ventas</h1>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                {["ID", "Cliente", "Total", "Fecha", "Estado"].map((h) => (
                  <th key={h} className="py-3 px-4 text-sm font-semibold text-slate-600">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-400">Cargando...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={5} className="py-8 text-center text-slate-400">Sin ventas registradas</td></tr>
              ) : (
                orders.slice((page - 1) * pageSize, page * pageSize).map((o) => (
                  <tr key={o.order_id} className="border-b border-slate-100 hover:bg-[#f8f8f8]">
                    <td className="py-3 px-4">#{o.order_id}</td>
                    <td className="py-3 px-4">{o.customer_name ?? "—"}</td>
                    <td className="py-3 px-4">S/{o.total}</td>
                    <td className="py-3 px-4">{new Date(o.created_at).toLocaleDateString()}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusClass(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 pb-2">
          <Pagination current={page} total={orders.length} pageSize={pageSize} onChange={setPage} />
        </div>
      </div>
    </div>
  );
}