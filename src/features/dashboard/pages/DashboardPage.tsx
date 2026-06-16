import { useEffect, useState } from "react";
import { getDashboardStats } from "../services/DashboardService";

type Stats = {
  totalProducts: number;
  lowStock: number;
  inventoryValue: number;
  totalOrders: number;
  totalUsers: number;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats()
      .then(setStats)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-slate-500">Cargando dashboard...</p>;

  const cards = [
    { label: "Total Productos", value: stats?.totalProducts ?? 0 },
    { label: "Bajo Stock", value: stats?.lowStock ?? 0 },
    { label: "Pedidos", value: stats?.totalOrders ?? 0 },
    { label: "Clientes", value: stats?.totalUsers ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {cards.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white p-5 rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
          >
            <small className="text-slate-500 text-xs">{label}</small>
            <h2 className="text-2xl font-bold mt-1">{value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}