export type CarouselSlide = {
  id: string;
  section: string;
  image_url: string;
  title: string | null;
  description: string | null;
  link: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export const CAROUSEL_SECTIONS = [
  { key: "products-banner", label: "Productos (Banner)" },
  { key: "services-hero", label: "Servicios (Hero)" },
  { key: "home-hero", label: "Inicio (Hero)" },
] as const;
