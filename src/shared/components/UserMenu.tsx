import { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icons } from "./Icons";
import { signOut, getSession, getProfile } from "../../services/supabase/auth";

interface UserMenuProps {
  variant?: "light" | "dark";
  onlyLogout?: boolean;
}

export function UserMenu({ variant = "light", onlyLogout }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getSession().then(async (session) => {
      if (session) {
        setIsAuthenticated(true);
        try {
          const profile = await getProfile(session.user.id);
          setDisplayName(`${profile.first_name}`);
          setIsAdmin(Number(profile.rol_id) === 1);
        } catch {
          setDisplayName(session.user.email ?? "");
        }
      }
    });
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const iconColor =
    variant === "dark"
      ? "text-slate-700 hover:text-slate-900"
      : "text-white hover:text-[#3b9de8]";
  const dropdownBg =
    variant === "dark"
      ? "bg-white border border-slate-200"
      : "bg-[#0a1628] border border-slate-700";
  const itemHover =
    variant === "dark" ? "hover:bg-slate-100" : "hover:bg-[#1144b5]";

  const handleLogout = async () => {
    setOpen(false);
    await signOut();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menú de usuario"
        className={`flex items-center gap-2 transition-colors ${iconColor}`}
      >
        <Icons.User />
        {displayName && (
          <span className="text-sm font-medium max-w-28 truncate">
            {displayName}
          </span>
        )}
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full mt-2 ${dropdownBg} rounded-lg shadow-lg py-2 min-w-44 z-50`}
        >
          {onlyLogout || isAuthenticated ? (
            <>
              {isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm ${itemHover} transition-colors`}
                >
                  Panel Admin
                </Link>
              )}
              {!onlyLogout && (
                <Link
                  to="/perfil"
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-2 text-sm ${itemHover} transition-colors`}
                >
                  Mi Perfil
                </Link>
              )}
              <button
                onClick={handleLogout}
                className={`block w-full text-left px-4 py-2 text-sm ${itemHover} transition-colors`}
              >
                Cerrar Sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm ${itemHover} transition-colors`}
              >
                Iniciar Sesión
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className={`block px-4 py-2 text-sm ${itemHover} transition-colors`}
              >
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}
