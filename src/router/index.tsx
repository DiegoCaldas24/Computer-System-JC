import { createBrowserRouter } from "react-router-dom";
import { HomePage, ProductsPage, RepairsPage } from "../pages";

import App from "../App";
import { ProductDetail } from "../pages/ProductDetail";

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
        element: <RepairsPage />,
      },
    ],
  },
]);
