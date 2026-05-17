import { useEffect, useState } from "react";
import { getAllCategories } from "../services/CategoryService";
import type { Category } from "../features/products/types/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getAllCategories();
      setCategories(categories);
    };

    fetchCategories();
  }, []);

  return categories;
};
