import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Icons } from "./Icons";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-primary backdrop-blur-md shadow-sm py-3">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center pl-10 cursor-pointer">
          <Link to="/" className="w-50 h-auto">
            <img src={logo} alt="TechPro Solutions" />
          </Link>
        </div>

        {/* Enlaces de Navegación horizontales con Tailwind directo */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-xs uppercase font-black tracking-widest transition-all duration-300"
          >
            inicio
          </Link>
          <Link
            to="/products"
            className="text-xs uppercase font-black tracking-widest transition-all duration-300"
          >
            productos
          </Link>
          <Link
            to="/repairs"
            className="text-xs uppercase font-black tracking-widest transition-all duration-300"
          >
            reparaciones
          </Link>
        </div>
        {/* Usuario */}

        {/* Carrito */}
        <button className="flex w-30 gap-2 bg-quaternary  text-white p-2.5 rounded-xl hover:bg-sky-600 transition-colors">
          {<Icons.ShoppingCar />}
          <span>Carrito</span>
        </button>
      </div>
    </nav>
  );
}
