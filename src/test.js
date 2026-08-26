import { matchPath } from "./lib/utils/matchPath";

const tests = [
    {
        routePath: "/",
        pathname: "/",
        expected: {},
    },
    {
        routePath: "/about",
        pathname: "/about",
        expected: {},
    },
    {
        routePath: "/users/:id",
        pathname: "/users/20",
        expected: {
            id: "20",
        },
    },
    {
        routePath: "/posts/:postId/edit",
        pathname: "/posts/15/edit",
        expected: {
            postId: "15",
        },
    },
    {
        routePath: "/posts/:postId/comments/:commentId",
        pathname: "/posts/10/comments/7",
        expected: {
            postId: "10",
            commentId: "7",
        },
    },
    {
        routePath: "/users/:name",
        pathname: "/users/irux%20san",
        expected: {
            name: "irux san",
        },
    },
    {
        routePath: "/users/:id",
        pathname: "/users",
        expected: null,
    },
    {
        routePath: "/users/:id",
        pathname: "/posts/20",
        expected: null,
    },
    {
        routePath: "/users/:id",
        pathname: "/users/20/settings",
        expected: null,
    },
];

tests.forEach(({ routePath, pathname, expected }, index) => {
    const result = matchPath(routePath, pathname);

    const passed =
        JSON.stringify(result) === JSON.stringify(expected);

    console.log(`Test ${index + 1}:`, passed ? "Passed ✅" : "Failed ❌");

    if (!passed) {
        console.log("Route:", routePath);
        console.log("Pathname:", pathname);
        console.log("Expected:", expected);
        console.log("Received:", result);
    }
});