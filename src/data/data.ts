import type { Product } from "../features/products/types/product";

// --- Mock Data ---
export const PRODUCTS: Product[] = [
  {
    product_id: 1,
    name: "MacBook Pro M2",
    price: 1299,
    category: "Laptops",
    description: "Potencia pura para profesionales.",
    image:
      "https://images.unsplash.com/photo-1517336712461-4c160d1b5ad1?auto=format&fit=crop&q=80&w=400",
  },
  {
    product_id: 2,
    name: "Gaming PC RTX 4080",
    price: 2499,
    category: "Escritorio",
    description: "Domina cualquier juego en 4K.",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=400",
  },
  {
    product_id: 3,
    name: 'Monitor UltraWide 34"',
    price: 499,
    category: "Monitores",
    description: "Productividad y gaming sin límites.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=400",
  },
  {
    product_id: 4,
    name: "Teclado Mecánico RGB",
    price: 120,
    category: "Accesorios",
    description: "Switches mecánicos de alta precisión.",
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=400",
  },
  {
    product_id: 5,
    name: "Impresora Láser Color",
    price: 350,
    category: "Impresoras",
    description: "Eficiencia para tu oficina u hogar.",
    image:
      "https://images.unsplash.com/photo-1612815154858-60aa0c79b6af?auto=format&fit=crop&q=80&w=400",
  },
  {
    product_id: 6,
    name: "SSD NVMe 2TB",
    price: 180,
    category: "Componentes",
    description: "Velocidades de lectura de hasta 7000MB/s.",
    image:
      "https://images.unsplash.com/photo-1597872200969-2b65dff8b3ad?auto=format&fit=crop&q=80&w=400",
  },
];

export const SERVICES = [
  {
    title: "Reparación de Laptops",
    desc: "Cambio de pantallas, teclados, baterías y optimización de software.",
  },
  {
    title: "Servicio de Impresoras",
    desc: "Mantenimiento preventivo, limpieza de cabezales y reparación mecánica.",
  },
  {
    title: "Armado de PC",
    desc: "Asesoría y ensamblaje de computadoras personalizadas para gaming o trabajo.",
  },
  {
    title: "Recuperación de Datos",
    desc: "Recuperamos tu información valiosa de discos dañados o formateados.",
  },
];
