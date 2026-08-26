import { createRoutes, NotFound } from "../lib";

import Home from '../pages/Home';
import User from '../pages/User';

const routes = createRoutes([
    {
        path: "/",
        component: Home
    },
    {
        path: "/users/:id",
        component: User
    },
    {
        path: "*",
        component: NotFound
    }
]);

export default routes;