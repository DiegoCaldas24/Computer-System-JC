import { useCategories } from "../../../hooks/useCategories";

export const CategoryCard = () => {
  const categories = useCategories();

  return (
    <select className="bg-white border border-slate-200 rounded-2xl px-4 py-2 text-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all">
      <option value="all">TODOS</option>
      {categories.map((category) => (
        <option key={category.category_id} value={category.category_id}>
          {category.name.toUpperCase()}
        </option>
      ))}
    </select>
  );
};
