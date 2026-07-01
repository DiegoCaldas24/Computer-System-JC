import { Link, useLocation } from "react-router-dom";
import logow from "../../assets/logos/logo-vec-w.png";
import { useState } from "react";
import { Icons } from "../../shared/components/Icons";
import { SearchBar } from "../../shared/components/SearchBar";
import { UserMenu } from "../../shared/components/UserMenu";
import { useCart } from "../../features/cart/context/CartContext";
interface NavItem {
  label: string;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Inicio", path: "/" },
  { label: "Catálogo", path: "/products" },
  { label: "Servicios", path: "/repairs" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { totalItems } = useCart();
  const { pathname } = useLocation();

  const isActive = (path: string) =>
    path === "/" ? pathname === "/" : pathname.startsWith(path);

  return (
    <header className="fixed w-full bg-[#0d1b36] text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-14 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0"
            aria-label="Ir al inicio"
          >
            <img src={logow} alt="Computer System JC" className="w-30" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link key={path} to={path}>
                <span className={`px-3 py-1 block transition-colors ${isActive(path) ? "text-[#3b9de8]" : "text-white hover:text-[#3b9de8]"}`}>{label}</span>
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-5 ml-auto">
            {/* Buscador */}
            <SearchBar />

            {/* Carrito */}
            <Link
              to="/cart"
              aria-label="Ver carrito"
              className="relative text-white hover:text-[#3b9de8] transition-colors"
            >
              <Icons.ShoppingCar />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full min-w-[18px] min-h-[18px] leading-none">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>

            {/* Usuario */}
            <UserMenu />
          </div>
          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            className="lg:hidden text-gray-300 hover:text-white transition-colors ml-auto"
          >
            {isOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={[
          "lg:hidden overflow-hidden transition-all duration-300 bg-[#0a1628]",
          isOpen ? "max-h-96 py-4" : "max-h-0",
        ].join(" ")}
      >
        <div className="px-4 flex flex-col gap-4">
          <SearchBar />

          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map(({ label, path }) => (
              <Link key={path} to={path} onClick={() => setIsOpen(false)} className={`transition-colors ${isActive(path) ? "text-[#3b9de8]" : "text-white hover:text-[#3b9de8]"}`}>
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 pt-1">
            <Link
              to="/cart"
              aria-label="Ver carrito"
              className="relative text-gray-300 hover:text-white transition-colors"
            >
              <Icons.ShoppingCar />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full min-w-[18px] min-h-[18px] leading-none">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </Link>
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}