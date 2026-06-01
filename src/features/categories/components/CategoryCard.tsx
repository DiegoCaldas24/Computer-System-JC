import { useCategories } from "../../../hooks/useCategories";

interface Props {
  selectedCategories: number[];
  onCategoryChange: (categoryId: number, isChecked: boolean) => void;
}

export const CategoryCard = ({
  selectedCategories,
  onCategoryChange,
}: Props) => {
  const categories = useCategories();

  const handleCategoryChange = (categoryId: number, isChecked: boolean) => {
    onCategoryChange(categoryId, isChecked);
  };

  return (
    <div className="bg-[#0d1b36] border border-slate-200 rounded-2xl px-4 py-2 text-slate-700 focus:ring-2 focus:ring-sky-500 outline-none transition-all">
      <span className="pb-4 text-white text-2xl">CATEGORIAS</span>
      <ul className="pt-4">
        {categories.map((category) => (
          <li
            key={category.category_id}
            className="text-white flex items-center gap-2 mb-2"
          >
            <input
              type="checkbox"
              id={`category-${category.category_id}`}
              checked={selectedCategories.includes(category.category_id)}
              onChange={(e) =>
                handleCategoryChange(category.category_id, e.target.checked)
              }
              className="cursor-pointer"
            />
            <label
              htmlFor={`category-${category.category_id}`}
              className="cursor-pointer"
            >
              {category.name.toUpperCase()}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
