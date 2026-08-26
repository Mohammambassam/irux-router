import { describe, expect, it } from "vitest";

import { createRoutes } from "../src/lib/utils/createRoutes";

function Home() {
  return null;
}

function About() {
  return null;
}

function NotFound() {
  return null;
}

describe("createRoutes", () => {
  it("creates and normalizes valid routes", () => {
    const routes = createRoutes([
      {
        path: "/",
        component: Home,
      },
      {
        path: "/about",
        component: About,
      },
    ]);

    expect(routes).toEqual([
      {
        id: "root",
        path: "/",
        component: Home,
      },
      {
        id: "about",
        path: "/about",
        component: About,
      },
    ]);
  });

  it("generates route ids automatically", () => {
    const routes = createRoutes([
      {
        path: "/users/:id",
        component: Home,
      },
    ]);

    expect(routes[0].id).toBe("users-param-id");
  });

  it("preserves a custom route id", () => {
    const routes = createRoutes([
      {
        id: "custom-home",
        path: "/",
        component: Home,
      },
    ]);

    expect(routes[0].id).toBe("custom-home");
  });

  it("preserves the route component", () => {
    const routes = createRoutes([
      {
        path: "/",
        component: Home,
      },
    ]);

    expect(routes[0].component).toBe(Home);
  });

  it("creates a not-found route id automatically", () => {
    const routes = createRoutes([
      {
        path: "*",
        component: NotFound,
      },
    ]);

    expect(routes[0].id).toBe("not-found");
  });

  it("freezes the returned routes array", () => {
    const routes = createRoutes([
      {
        path: "/",
        component: Home,
      },
    ]);

    expect(Object.isFrozen(routes)).toBe(true);
  });

  it("freezes every normalized route object", () => {
    const routes = createRoutes([
      {
        path: "/",
        component: Home,
      },
      {
        path: "/about",
        component: About,
      },
    ]);

    expect(Object.isFrozen(routes[0])).toBe(true);
    expect(Object.isFrozen(routes[1])).toBe(true);
  });

  it("does not mutate the original route object", () => {
    const originalRoute = {
      path: "/",
      component: Home,
    };

    createRoutes([originalRoute]);

    expect(originalRoute).toEqual({
      path: "/",
      component: Home,
    });

    expect(originalRoute).not.toHaveProperty("id");
  });

  it("throws when routes is not an array", () => {
    expect(() => createRoutes("invalid")).toThrow(
      "createRoutes() expects an array of routes."
    );
  });

  it("throws when a route is not an object", () => {
    expect(() => createRoutes(["invalid"])).toThrow(
      "Route at index 0 must be object."
    );
  });

  it("throws when a route is null", () => {
    expect(() => createRoutes([null])).toThrow(
      "Route at index 0 must be object."
    );
  });

  it("throws when a route is an array", () => {
    expect(() => createRoutes([[]])).toThrow(
      "Route at index 0 must be object."
    );
  });

  it("includes the correct route index in object errors", () => {
    expect(() =>
      createRoutes([
        {
          path: "/",
          component: Home,
        },
        "invalid",
      ])
    ).toThrow("Route at index 1 must be object.");
  });

  it("throws when path is missing", () => {
    expect(() =>
      createRoutes([
        {
          component: Home,
        },
      ])
    ).toThrow("Route at index 0 must be valid string path.");
  });

  it("throws when path is not a string", () => {
    expect(() =>
      createRoutes([
        {
          path: 123,
          component: Home,
        },
      ])
    ).toThrow("Route at index 0 must be valid string path.");
  });

  it("throws when path is an empty string", () => {
    expect(() =>
      createRoutes([
        {
          path: "",
          component: Home,
        },
      ])
    ).toThrow("Route at index 0 must be valid string path.");
  });

  it("throws when path contains only spaces", () => {
    expect(() =>
      createRoutes([
        {
          path: "   ",
          component: Home,
        },
      ])
    ).toThrow("Route at index 0 must be valid string path.");
  });

  it('throws when a normal path does not start with "/"', () => {
    expect(() =>
      createRoutes([
        {
          path: "about",
          component: About,
        },
      ])
    ).toThrow('Route path "about" must start with "/".');
  });

  it('allows "*" without a leading slash', () => {
    expect(() =>
      createRoutes([
        {
          path: "*",
          component: NotFound,
        },
      ])
    ).not.toThrow();
  });

  it("throws when component is missing", () => {
    expect(() =>
      createRoutes([
        {
          path: "/",
        },
      ])
    ).toThrow('Route "/" must have a component.');
  });

  it("throws when component is undefined", () => {
    expect(() =>
      createRoutes([
        {
          path: "/",
          component: undefined,
        },
      ])
    ).toThrow('Route "/" must have a component.');
  });

  it("throws when component is null", () => {
    expect(() =>
      createRoutes([
        {
          path: "/",
          component: null,
        },
      ])
    ).toThrow('Route "/" must have a component.');
  });

  it("throws when route paths are duplicated", () => {
    expect(() =>
      createRoutes([
        {
          path: "/about",
          component: About,
        },
        {
          path: "/about",
          component: Home,
        },
      ])
    ).toThrow('Duplicate route path detected: "/about".');
  });

  it("throws when a custom id is not a string", () => {
    expect(() =>
      createRoutes([
        {
          id: 123,
          path: "/",
          component: Home,
        },
      ])
    ).toThrow('Route "/" must have a valid string id.');
  });

  it("throws when a custom id is an empty string", () => {
    expect(() =>
      createRoutes([
        {
          id: "",
          path: "/",
          component: Home,
        },
      ])
    ).toThrow('Route "/" must have a valid string id.');
  });

  it("throws when a custom id contains only spaces", () => {
    expect(() =>
      createRoutes([
        {
          id: "   ",
          path: "/",
          component: Home,
        },
      ])
    ).toThrow('Route "/" must have a valid string id.');
  });

  it("throws when route ids are duplicated", () => {
    expect(() =>
      createRoutes([
        {
          id: "page",
          path: "/",
          component: Home,
        },
        {
          id: "page",
          path: "/about",
          component: About,
        },
      ])
    ).toThrow('Duplicate route id detected: "page".');
  });

  it("detects collisions between generated ids", () => {
    expect(() =>
      createRoutes([
        {
          path: "/user-profile",
          component: Home,
        },
        {
          path: "/user--profile",
          component: About,
        },
      ])
    ).toThrow('Duplicate route id detected: "user-profile".');
  });

  it("detects collisions between generated and custom ids", () => {
    expect(() =>
      createRoutes([
        {
          path: "/about",
          component: About,
        },
        {
          id: "about",
          path: "/company",
          component: Home,
        },
      ])
    ).toThrow('Duplicate route id detected: "about".');
  });

  it("allows the not-found route when it is last", () => {
    expect(() =>
      createRoutes([
        {
          path: "/",
          component: Home,
        },
        {
          path: "*",
          component: NotFound,
        },
      ])
    ).not.toThrow();
  });

  it("throws when the not-found route is not last", () => {
    expect(() =>
      createRoutes([
        {
          path: "*",
          component: NotFound,
        },
        {
          path: "/",
          component: Home,
        },
      ])
    ).toThrow(
      'The NotFound route with path "*" must be the last route.'
    );
  });

  it("accepts an empty routes array", () => {
    const routes = createRoutes([]);

    expect(routes).toEqual([]);
    expect(Object.isFrozen(routes)).toBe(true);
  });

  it("supports dynamic routes", () => {
    const routes = createRoutes([
      {
        path: "/users/:userId/posts/:postId",
        component: Home,
      },
    ]);

    expect(routes[0]).toEqual({
      id: "users-param-userId-posts-param-postId",
      path: "/users/:userId/posts/:postId",
      component: Home,
    });
  });
});