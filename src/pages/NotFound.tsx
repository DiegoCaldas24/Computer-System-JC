import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center px-4">
        <h1 className="text-8xl font-black text-black mb-4">404</h1>
        <h2 className="text-2xl font-bold text-black mb-2">Página no encontrada</h2>
        <p className="text-black mb-8">La página que buscas no existe o fue movida.</p>
        <Link
          to="/"
          className="inline-block bg-[#0088d2] hover:bg-[#169de7] text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}