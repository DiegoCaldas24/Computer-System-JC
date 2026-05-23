import { Link } from "react-router-dom";
import logo from "../assets/logoIcon.png";
import { Icons } from "./Icons";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-[#003B6F] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img className="w-15" src={logo} />

            <div className="leading-tight flex flex-col items-center">
              <h1 className="text-sm sm:text-base font-bold">COMPUTER</h1>

              <p className="text-xs text-slate-200">SYSTEM-JC</p>
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Links */}
            <nav className="flex items-center gap-6 text-sm font-semibold">
              <Link to={"/"} className="hover:text-sky-300 transition-colors">
                INICIO
              </Link>

              <Link
                to={"/products"}
                className="hover:text-sky-300 transition-colors"
              >
                PRODUCTOS
              </Link>

              <Link
                to={"/repairs"}
                className="hover:text-sky-300 transition-colors"
              >
                SERVICIO TÉCNICO
              </Link>
            </nav>

            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="🔍 Buscar productos ..."
                className="
                     w-64
                     xl:w-80
                     h-10
                     rounded-full
                     px-4
                     text-sm
                     text-black
                     outline-none
                     bg-white
                   "
              />
            </div>

            {/* Icons */}
            <div className="flex items-center gap-5">
              <button className="flex items-center gap-1 hover:scale-105 transition-transform">
                <Icons.User />
                <div className="flex flex-col">
                  <span>Bienvenido</span>
                  <span>Inicia sesion</span>
                </div>
              </button>
              <button className="w-35 flex flex-auto items-center hover:scale-105 transition-transform">
                <Icons.ShoppingCar />
                <div>
                  <span>Carrito de compras</span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile button */}
          <button onClick={() => setOpen(!open)} className="lg:hidden">
            {open ? <Icons.Minus /> : <Icons.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`
             lg:hidden
             overflow-hidden
             transition-all
             duration-300
             bg-[#002F59]
             ${open ? "max-h-125 py-4" : "max-h-0"}
           `}
      >
        <div className="px-4 flex flex-col gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Buscar productos ..."
            className="
                 w-full
                 h-10
                 rounded-full
                 px-4
                 text-sm
                 text-black
                 outline-none
                 bg-white
               "
          />

          {/* Links */}
          <nav className="flex flex-col gap-3 text-sm font-semibold">
            <Link to={"/"} className="hover:text-sky-300 transition-colors">
              INICIO
            </Link>

            <Link
              to={"/products"}
              className="hover:text-sky-300 transition-colors"
            >
              PRODUCTOS
            </Link>

            <Link
              to={"/repairs"}
              className="hover:text-sky-300 transition-colors"
            >
              SERVICIO TÉCNICO
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5 pt-2">
            <button>
              <Icons.ShoppingCar />
            </button>

            <button>
              <Icons.User />
              <div>
                <span>Bienvenido</span>
                <span>Inicia sesion</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
