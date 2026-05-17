import { useEffect, useState } from "react";
import { getAllProducts } from "../services/ProductService";
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
