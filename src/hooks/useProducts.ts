import { useEffect, useState } from "react";
import {
  getAllProducts,
  getProductByCategory,
  getProductById,
  searchProducts,
} from "../services/ProductService";
import type { Product } from "../features/products/types/product";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return products;
};

export const useProduct = (product_id: number) => {
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const fetchProducts = async () => {
      const product = await getProductById(product_id);
      setProduct(product);
    };

    fetchProducts();
  }, [product_id]);

  return product;
};

export const useCategoryProducts = (category: number) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProductByCategory(category);
      setProducts(products);
    };

    fetchProducts();
  }, [category]);

  return products;
};

export const useSearchProducts = (
  searchQuery: string,
  categoryIds?: number[],
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setProducts([]);
      return;
    }

    const fetchSearchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const results = await searchProducts(searchQuery, categoryIds);
        setProducts(results || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error en la búsqueda");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, categoryIds]);

  return { products, loading, error };
};
