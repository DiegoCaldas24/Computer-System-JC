import { useEffect, useState } from "react";
import { Pagination } from "../../../shared/components/Pagination";
import { getAllUsers } from "../services/UserService";

type User = {
  user_id: string;
  name: string;
  email: string;
  role: string;
  status: boolean;
};

const statusClass = (status: boolean) => {
  switch (status) {
    case true:
      return "bg-green-100 text-green-800";
    case false:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data ?? []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Usuarios</h1>

      <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-200">
                {["Nombre", "Correo", "Rol", "Estado", "Acciones"].map((h) => (
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
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Cargando...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-400">
                    Sin usuarios
                  </td>
                </tr>
              ) : (
                users.slice((page - 1) * pageSize, page * pageSize).map((u) => (
                  <tr
                    key={u.user_id}
                    className="border-b border-slate-100 hover:bg-[#f8f8f8]"
                  >
                    <td className="py-3 px-4">{u.name}</td>
                    <td className="py-3 px-4">{u.email}</td>
                    <td className="py-3 px-4">{u.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusClass(u.status)}`}
                      >
                        {u.status ? "Activo" : "Inactivo"}
                      </span>
                    </td>
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
          <Pagination
            current={page}
            total={users.length}
            pageSize={pageSize}
            onChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
