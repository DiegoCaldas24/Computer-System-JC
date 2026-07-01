import { useEffect, useState } from "react";
import { getAllBrands } from "../services/BrandService";
import type { Brand } from "../types/brand";

export const useBrands = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const brands = await getAllBrands();
        setBrands(brands);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar marcas");
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};
