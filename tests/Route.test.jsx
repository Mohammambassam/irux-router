import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { Route } from "../src/lib/components/Route";
import { RouterContext } from "../src/lib/context/RouterContext";
import { useParams } from "../src/lib/hooks/useParams";

function renderRoute(ui, pathname = "/") {
  return render(
    <RouterContext.Provider
      value={{
        pathname,
        navigate: () => {},
      }}
    >
      {ui}
    </RouterContext.Provider>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function User() {
  const params = useParams();

  return <h1>User: {params.id}</h1>;
}

function Post() {
  const params = useParams();

  return (
    <h1>
      User {params.userId} - Post {params.postId}
    </h1>
  );
}

function NotFound() {
  const params = useParams();

  return (
    <div>
      <h1>404 Page</h1>
      <span data-testid="params">{JSON.stringify(params)}</span>
    </div>
  );
}

describe("Route", () => {
  it("renders the component when a static route matches", () => {
    renderRoute(
      <Route path="/" component={Home} />,
      "/"
    );

    expect(
      screen.getByRole("heading", {
        name: "Home Page",
      })
    ).toBeInTheDocument();
  });

  it("does not render the component when a static route does not match", () => {
    renderRoute(
      <Route path="/about" component={Home} />,
      "/contact"
    );

    expect(
      screen.queryByRole("heading", {
        name: "Home Page",
      })
    ).not.toBeInTheDocument();
  });

  it("renders a dynamic route when it matches", () => {
    renderRoute(
      <Route path="/users/:id" component={User} />,
      "/users/15"
    );

    expect(
      screen.getByRole("heading", {
        name: "User: 15",
      })
    ).toBeInTheDocument();
  });

  it("provides dynamic params through useParams", () => {
    renderRoute(
      <Route path="/users/:id" component={User} />,
      "/users/99"
    );

    expect(screen.getByText("User: 99")).toBeInTheDocument();
  });

  it("provides multiple dynamic params", () => {
    renderRoute(
      <Route
        path="/users/:userId/posts/:postId"
        component={Post}
      />,
      "/users/12/posts/88"
    );

    expect(
      screen.getByText("User 12 - Post 88")
    ).toBeInTheDocument();
  });

  it("decodes dynamic parameter values", () => {
    renderRoute(
      <Route path="/users/:id" component={User} />,
      "/users/john%20doe"
    );

    expect(
      screen.getByText("User: john doe")
    ).toBeInTheDocument();
  });

  it("ignores a trailing slash", () => {
    renderRoute(
      <Route path="/users/:id/" component={User} />,
      "/users/42/"
    );

    expect(
      screen.getByText("User: 42")
    ).toBeInTheDocument();
  });

  it("does not partially match a route", () => {
    renderRoute(
      <Route path="/users/:id" component={User} />,
      "/users/15/profile"
    );

    expect(
      screen.queryByText("User: 15")
    ).not.toBeInTheDocument();
  });

  it("renders the wildcard route when no route has matched", () => {
    renderRoute(
      <Route
        path="*"
        component={NotFound}
        hasMatch={false}
      />,
      "/unknown"
    );

    expect(
      screen.getByRole("heading", {
        name: "404 Page",
      })
    ).toBeInTheDocument();
  });

  it("does not render the wildcard route when another route matched", () => {
    renderRoute(
      <Route
        path="*"
        component={NotFound}
        hasMatch={true}
      />,
      "/users/15"
    );

    expect(
      screen.queryByRole("heading", {
        name: "404 Page",
      })
    ).not.toBeInTheDocument();
  });

  it("provides an empty params object to the wildcard component", () => {
    renderRoute(
      <Route
        path="*"
        component={NotFound}
        hasMatch={false}
      />,
      "/unknown"
    );

    expect(screen.getByTestId("params")).toHaveTextContent("{}");
  });

  it("is case-sensitive", () => {
    renderRoute(
      <Route path="/Users/:id" component={User} />,
      "/users/15"
    );

    expect(
      screen.queryByText("User: 15")
    ).not.toBeInTheDocument();
  });
});