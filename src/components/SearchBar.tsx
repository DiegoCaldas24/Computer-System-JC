import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Icons } from "./Icons";

export function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(initialSearch);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchInput)}`);
    }
  };

  const handleClear = () => {
    setSearchInput("");
    navigate("/products");
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <Icons.Search />

      <input
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="
          bg-[#0F2D57]
          border border-[#1E4C84]
          text-sm text-white
          placeholder:text-gray-400
          rounded-sm
          pl-9 pr-9
          h-9 w-64
          outline-none
          focus:border-[#3b9de8]
          focus:ring-1 focus:ring-[#3b9de8]
          transition-all
        "
      />

      {searchInput && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </form>
  );
}
