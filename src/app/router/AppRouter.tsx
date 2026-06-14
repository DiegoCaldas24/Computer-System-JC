import { createBrowserRouter } from "react-router-dom";
import { HomePage, ServicePage } from "../../pages";
import { ProductsPage } from "../../features/products/pages/ProductsPage";
import { ProductDetail } from "../../features/products/pages/ProductDetail";

import App from "../layouts/ClientLayout";
import { NotFound } from "../../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "product/:product_id",
        element: <ProductDetail />,
      },
      {
        path: "repairs",
        element: <ServicePage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);