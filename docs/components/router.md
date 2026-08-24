# Router

The `Router` component is the root of every **irux-router** application.

It tracks the current browser location, handles navigation events, and renders the route that matches the current pathname.

---

## Usage

Place `Router` near the root of your application.

```jsx
import { Router } from "irux-router";

export default function App() {
  return (
    <Router>
      {/* Route components */}
    </Router>
  );
}
```

---

## Props

### `children`

Defines routes using `<Route />` components.

**Type**

```ts
React.ReactNode
```

Example:

```jsx
<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="*" component={NotFound} />
</Router>
```

---

### `routes`

Defines routes using a route configuration created with `createRoutes()`.

**Type**

```ts
RouteConfig[]
```

Example:

```jsx
import { Router, createRoutes } from "irux-router";

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const routes = createRoutes([
  {
    path: "/",
    component: Home,
  },
  {
    id: "about",
    path: "/about",
    component: About,
  },
  {
    path: "*",
    component: NotFound,
  },
]);

export default function App() {
  return <Router routes={routes} />;
}
```

---

## Route Configuration Rules

When using `createRoutes()`, your route configuration must include a root route and a fallback route.

### Root Route

```jsx
{
  path: "/",
  component: Home,
}
```

> [!IMPORTANT]
> The root route must use `path: "/"`. This structure is required by the routing engine.

---

### Fallback Route

```jsx
{
  path: "*",
  component: NotFound,
}
```

> [!IMPORTANT]
> Always include a route with `path: "*"`. It is used when no other route matches the current pathname.

---

## Routing Styles

### JSX Routes

```jsx
<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="*" component={NotFound} />
</Router>
```

This approach is recommended for small applications.

---

### Route Configuration

```jsx
const routes = createRoutes([
  {
    path: "/",
    component: Home,
  },
  {
    id: "about",
    path: "/about",
    component: About,
  },
  {
    path: "*",
    component: NotFound,
  },
]);

<Router routes={routes} />
```

This approach keeps all routes in one place and is recommended for medium and large applications.

---

## Do Not Mix Routing Styles

❌ Incorrect

```jsx
<Router routes={routes}>
  <Route path="/contact" component={Contact} />
</Router>
```

> [!WARNING]
> Do not use the `routes` prop together with `<Route>` children.

✅ Correct

```jsx
<Router routes={routes} />
```

or

```jsx
<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="*" component={NotFound} />
</Router>
```

---

## Best Practices

> [!TIP]
> Place `Router` once at the root of your application.

> [!TIP]
> Use `createRoutes()` when your application contains many routes.

> [!TIP]
> Keep route definitions organized and easy to read.

---

## Browser Navigation

The router automatically handles:

- Link navigation
- Programmatic navigation
- Browser Back button
- Browser Forward button

using the browser History API.

---

## Related

- [Route](/components/route)
- [Link](/components/link)
- [NotFound](/components/not-found)
- [createRoutes](/utilities/create-routes)