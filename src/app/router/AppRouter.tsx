import { createBrowserRouter } from "react-router-dom";
import { HomePage, ServicePage } from "../../pages";
import { ProductsPage } from "../../features/products/pages/ProductsPage";
import { ProductDetail } from "../../features/products/pages/ProductDetail";
import AdminProductsPage from "../../features/products/pages/AdminProductsPage";
import CartPage from "../../features/cart/pages/CartPage";
import MyCommentsPage from "../../features/comments/pages/MyCommentsPage";
import PublicCommentsPage from "../../features/comments/pages/PublicCommentsPage";
import ProfilePage from "../../features/profile/pages/ProfilePage";
import MyConversationsPage from "../../features/conversations/pages/MyConversationsPage";
import AdminConversationsPage from "../../features/conversations/pages/AdminConversationsPage";

import App from "../layouts/ClientLayout";
import AdminLayout from "../layouts/AdminLayout";
import { NotFound } from "../../pages/NotFound";
import DashboardPage from "../../features/dashboard/pages/DashboardPage";
import SalesPage from "../../features/sales/pages/SalesPage";
import CategoriesPage from "../../features/categories/pages/CategoriesPage";
import BrandsPage from "../../features/brands/pages/BrandsPage";
import AdminCommentsPage from "../../features/comments/pages/AdminCommentsPage";
import UsersPage from "../../features/auth/pages/UsersPage";
import AuthPage from "../../features/auth/pages/AuthPage";

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
        path: "login",
        element: <AuthPage />,
      },
      {
        path: "register",
        element: <AuthPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "mis-comentarios",
        element: <MyCommentsPage />,
      },
      {
        path: "comentarios",
        element: <PublicCommentsPage />,
      },
      {
        path: "perfil",
        element: <ProfilePage />,
      },
      {
        path: "mis-consultas",
        element: <MyConversationsPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "sales",
        element: <SalesPage />,
      },
      {
        path: "products",
        element: <AdminProductsPage />,
      },
      {
        path: "categories",
        element: <CategoriesPage />,
      },
      {
        path: "brands",
        element: <BrandsPage />,
      },
      {
        path: "comments",
        element: <AdminCommentsPage />,
      },
      {
        path: "conversaciones",
        element: <AdminConversationsPage />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);