import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Icons } from "../../shared/components/Icons";
import { ToastProvider } from "../../shared/components/Toast";
import { signOut } from "../../services/supabase/auth";

const NAV_ITEMS = [
  { label: "Dashboard", icon: <Icons.Cpu />, to: "/admin" },
  { label: "Ventas", icon: <Icons.ShoppingBag />, to: "/admin/sales" },
  { label: "Productos", icon: <Icons.Laptop />, to: "/admin/products" },
  { label: "Categorías", icon: <Icons.Menu />, to: "/admin/categories" },
  { label: "Marcas", icon: <Icons.Shield />, to: "/admin/brands" },
  { label: "Comentarios", icon: <Icons.MessageCircle />, to: "/admin/comments" },
  { label: "Conversaciones", icon: <Icons.MessageCircle />, to: "/admin/conversaciones" },
  { label: "Usuarios", icon: <Icons.User />, to: "/admin/users" },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#f4f6fa]">
      <aside className="w-60 bg-[#081f57] text-white p-5 shrink-0 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="/src/assets/logos/logo-vec-w.png"
            alt="Logo"
            className="h-8"
          />
        </div>

        <nav className="flex flex-col gap-1">
          {NAV_ITEMS.map(({ label, icon, to }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-[#1144b5]" : "hover:bg-[#1144b5]"
                }`
              }
            >
              <span className="w-5 h-5 flex items-center justify-center [&>svg]:w-5 [&>svg]:h-5">
                {icon}
              </span>{" "}
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-slate-700 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-full px-4 py-2 rounded-lg hover:bg-[#1144b5]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Ver Tienda
          </Link>
          <button
            onClick={async () => { await signOut(); navigate("/"); }}
            className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors w-full cursor-pointer px-4 py-2 rounded-lg hover:bg-[#1144b5]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <ToastProvider>
          <Outlet />
        </ToastProvider>
      </main>
    </div>
  );
}
