export type BrandJoin = {
  name: string;
};

export type CategoryJoin = {
  name: string;
};

export type Product = {
  product_id: number;
  name: string;
  price: number;
  description: string;
  category?: string | CategoryJoin | null;
  category_id?: number | null;
  image: string;
  brand?: string | BrandJoin | null;
  brand_id?: number | null;
};
