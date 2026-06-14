import { useEffect, useState } from "react";
import { getAllCategories } from "../services/CategoryService";
import type { Category } from "../types/category";

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categories = await getAllCategories();
        setCategories(categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar categorías");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};