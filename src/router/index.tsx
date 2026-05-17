import { createBrowserRouter } from "react-router-dom";
import { HomePage, ProductsPage, RepairsPage } from '../pages';

import App from "../App";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "products",
                element: <ProductsPage />
            },
            {
                path: "repairs",
                element: <RepairsPage />
            }
        ]
    }
]);