import { useEffect, useState } from "react";
import { getAllProducts, getProductById } from "../services/ProductService";
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
