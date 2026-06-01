import { useSearch } from "../context/SearchContext";
import { Icons } from "./Icons";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex items-center">
      <Icons.Search />

      <input
        placeholder="Buscar productos..."
        aria-label="Buscar productos"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="
          bg-[#0F2D57]
          border border-[#1E4C84]
          text-sm text-white
          placeholder:text-gray-400
          rounded-sm
          pl-9 pr-9
          h-9 w-full lg:w-64
          outline-none
          focus:border-[#3b9de8]
          focus:ring-1 focus:ring-[#3b9de8]
          transition-all
        "
      />

      {searchQuery && (
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
