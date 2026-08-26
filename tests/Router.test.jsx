// tests/Router.test.jsx

import React from "react";
import {
  act,
  fireEvent,
  render,
  screen
} from "@testing-library/react";

import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from "vitest";

import { Router } from "../src/lib/components/Router";
import { Route } from "../src/lib/components/Route";
import { Link } from "../src/lib/components/Link";
import { useParams } from "../src/lib/hooks/useParams";

function Home() {
  return (
    <div>
      <h1>Home Page</h1>

      <Link to="/about">
        Go to About
      </Link>
    </div>
  );
}

function About() {
  return (
    <div>
      <h1>About Page</h1>

      <Link to="/">
        Go Home
      </Link>
    </div>
  );
}

function User() {
  const params = useParams();

  return (
    <h1>
      User Page: {params.id}
    </h1>
  );
}

function NotFoundPage() {
  return <h1>Page Not Found</h1>;
}

const routes = [
  {
    id: "home",
    path: "/",
    component: Home
  },
  {
    id: "about",
    path: "/about",
    component: About
  },
  {
    id: "user",
    path: "/users/:id",
    component: User
  },
  {
    id: "not-found",
    path: "*",
    component: NotFoundPage
  }
];

function ChildrenRouter() {
  return (
    <Router>
      <Route
        path="/"
        component={Home}
      />

      <Route
        path="/about"
        component={About}
      />

      <Route
        path="/users/:id"
        component={User}
      />

      <Route
        path="*"
        component={NotFoundPage}
      />
    </Router>
  );
}

describe("Router", () => {
  beforeEach(() => {
    window.history.replaceState(
      {},
      "",
      "/"
    );

    vi.restoreAllMocks();
  });

  describe("routes prop", () => {
    it("renders the root route", () => {
      render(<Router routes={routes} />);

      expect(
        screen.getByRole("heading", {
          name: "Home Page"
        })
      ).toBeInTheDocument();
    });

    it("renders the route matching the current pathname", () => {
      window.history.replaceState(
        {},
        "",
        "/about"
      );

      render(<Router routes={routes} />);

      expect(
        screen.getByRole("heading", {
          name: "About Page"
        })
      ).toBeInTheDocument();
    });

    it("navigates between routes using Link", () => {
      render(<Router routes={routes} />);

      fireEvent.click(
        screen.getByRole("link", {
          name: "Go to About"
        })
      );

      expect(
        window.location.pathname
      ).toBe("/about");

      expect(
        screen.getByRole("heading", {
          name: "About Page"
        })
      ).toBeInTheDocument();

      expect(
        screen.queryByRole("heading", {
          name: "Home Page"
        })
      ).not.toBeInTheDocument();
    });

    it("supports dynamic routes", () => {
      window.history.replaceState(
        {},
        "",
        "/users/42"
      );

      render(<Router routes={routes} />);

      expect(
        screen.getByRole("heading", {
          name: "User Page: 42"
        })
      ).toBeInTheDocument();
    });

    it("renders the wildcard route when no route matches", () => {
      window.history.replaceState(
        {},
        "",
        "/unknown-page"
      );

      render(<Router routes={routes} />);

      expect(
        screen.getByRole("heading", {
          name: "Page Not Found"
        })
      ).toBeInTheDocument();
    });

    it("updates after a popstate event", () => {
      render(<Router routes={routes} />);

      expect(
        screen.getByRole("heading", {
          name: "Home Page"
        })
      ).toBeInTheDocument();

      act(() => {
        window.history.pushState(
          {},
          "",
          "/about"
        );

        window.dispatchEvent(
          new PopStateEvent("popstate")
        );
      });

      expect(
        window.location.pathname
      ).toBe("/about");

      expect(
        screen.getByRole("heading", {
          name: "About Page"
        })
      ).toBeInTheDocument();

      act(() => {
        window.history.pushState(
          {},
          "",
          "/"
        );

        window.dispatchEvent(
          new PopStateEvent("popstate")
        );
      });

      expect(
        window.location.pathname
      ).toBe("/");

      expect(
        screen.getByRole("heading", {
          name: "Home Page"
        })
      ).toBeInTheDocument();
    });
  });

  describe("children routes", () => {
    it("renders the root child route", () => {
      render(<ChildrenRouter />);

      expect(
        screen.getByRole("heading", {
          name: "Home Page"
        })
      ).toBeInTheDocument();
    });

    it("renders the matching child route", () => {
      window.history.replaceState(
        {},
        "",
        "/about"
      );

      render(<ChildrenRouter />);

      expect(
        screen.getByRole("heading", {
          name: "About Page"
        })
      ).toBeInTheDocument();
    });

    it("navigates between child routes using Link", () => {
      render(<ChildrenRouter />);

      fireEvent.click(
        screen.getByRole("link", {
          name: "Go to About"
        })
      );

      expect(
        window.location.pathname
      ).toBe("/about");

      expect(
        screen.getByRole("heading", {
          name: "About Page"
        })
      ).toBeInTheDocument();

      expect(
        screen.queryByRole("heading", {
          name: "Home Page"
        })
      ).not.toBeInTheDocument();
    });

    it("supports dynamic child routes", () => {
      window.history.replaceState(
        {},
        "",
        "/users/99"
      );

      render(<ChildrenRouter />);

      expect(
        screen.getByRole("heading", {
          name: "User Page: 99"
        })
      ).toBeInTheDocument();
    });

    it("renders the wildcard child when no route matches", () => {
      window.history.replaceState(
        {},
        "",
        "/nothing-here"
      );

      render(<ChildrenRouter />);

      expect(
        screen.getByRole("heading", {
          name: "Page Not Found"
        })
      ).toBeInTheDocument();
    });

    it("updates child routes after a popstate event", () => {
      render(<ChildrenRouter />);

      expect(
        screen.getByRole("heading", {
          name: "Home Page"
        })
      ).toBeInTheDocument();

      act(() => {
        window.history.pushState(
          {},
          "",
          "/about"
        );

        window.dispatchEvent(
          new PopStateEvent("popstate")
        );
      });

      expect(
        window.location.pathname
      ).toBe("/about");

      expect(
        screen.getByRole("heading", {
          name: "About Page"
        })
      ).toBeInTheDocument();

      act(() => {
        window.history.pushState(
          {},
          "",
          "/"
        );

        window.dispatchEvent(
          new PopStateEvent("popstate")
        );
      });

      expect(
        window.location.pathname
      ).toBe("/");

      expect(
        screen.getByRole("heading", {
          name: "Home Page"
        })
      ).toBeInTheDocument();
    });

    it("ignores invalid non-element children", () => {
      render(
        <Router>
          This text should be ignored

          {null}

          {false}

          <Route
            path="/"
            component={Home}
          />
        </Router>
      );

      expect(
        screen.getByRole("heading", {
          name: "Home Page"
        })
      ).toBeInTheDocument();
    });
  });

  it("throws when routes prop and children are used together", () => {
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(
        <Router routes={routes}>
          <Route
            path="/"
            component={Home}
          />
        </Router>
      );
    }).toThrow(
      'Router cannot use both the "routes" prop and route children'
    );

    consoleErrorSpy.mockRestore();
  });

  it("does not navigate when the target equals the current pathname", () => {
    const pushStateSpy = vi.spyOn(
      window.history,
      "pushState"
    );

    render(
      <Router>
        <Route
          path="/"
          component={() => (
            <Link to="/">
              Current Page
            </Link>
          )}
        />

        <Route
          path="*"
          component={NotFoundPage}
        />
      </Router>
    );

    fireEvent.click(
      screen.getByRole("link", {
        name: "Current Page"
      })
    );

    expect(
      pushStateSpy
    ).not.toHaveBeenCalled();
  });

  it("adds and removes the popstate listener", () => {
    const addEventListenerSpy = vi.spyOn(
      window,
      "addEventListener"
    );

    const removeEventListenerSpy = vi.spyOn(
      window,
      "removeEventListener"
    );

    const { unmount } = render(
      <Router routes={routes} />
    );

    const popStateCall =
      addEventListenerSpy.mock.calls.find(
        ([eventName]) =>
          eventName === "popstate"
      );

    expect(popStateCall).toBeDefined();

    const popStateHandler = popStateCall[1];

    unmount();

    expect(
      removeEventListenerSpy
    ).toHaveBeenCalledWith(
      "popstate",
      popStateHandler
    );
  });
});