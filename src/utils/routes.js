import { createRoutes, NotFound } from "../lib";

import Home from '../pages/Home';
import Products from '../pages/Products';

export const routes = createRoutes([
    {
        path: "/",
        component: Home
    },
    {
        id: "products",
        path: "/products",
        component: Products
    },
    {
        path: "*",
        component: NotFound
    }
])