# createRoutes

The `createRoutes()` utility validates, normalizes, and freezes an array of route definitions.

It provides a centralized and predictable way to define routes before passing them to the `Router`.

---

## Usage

```jsx
import {
  Router,
  createRoutes,
  NotFound,
} from "irux-router";

import Home from "./pages/Home";
import About from "./pages/About";

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

## Parameters

`createRoutes()` accepts an array of route objects.

```ts
createRoutes(routes: RouteConfig[]): Readonly<RouteConfig[]>
```

> [!IMPORTANT]
> The argument passed to `createRoutes()` must be an array.

---

## Route Object

Each route object has the following structure:

```ts
{
  id?: string;
  path: string;
  component: React.ComponentType;
}
```

---

## Route Properties

### `path`

The pathname matched by the route.

**Type**

```ts
string
```

Examples:

```jsx
{
  path: "/",
  component: Home,
}
```

```jsx
{
  path: "/about",
  component: About,
}
```

```jsx
{
  path: "*",
  component: NotFound,
}
```

> [!IMPORTANT]
> Every path must be a non-empty string.

> [!IMPORTANT]
> Every regular route must start with `/`.

> [!NOTE]
> The only exception is the fallback route (`*`).

---

### `component`

The React component rendered when the route matches.

**Type**

```ts
React.ComponentType
```

```jsx
{
  path: "/about",
  component: About,
}
```

> [!IMPORTANT]
> Every route must define a component.

---

### `id`

A unique identifier for the route.

**Type**

```ts
string
```

Providing an `id` is optional.

```jsx
{
  id: "about",
  path: "/about",
  component: About,
}
```

If omitted, `createRoutes()` automatically generates one.

```jsx
{
  path: "/about",
  component: About,
}
```

> [!NOTE]
> Route IDs are generated automatically when omitted.

> [!IMPORTANT]
> Every route ID must be unique.

---

## Fallback Route

The fallback route is matched when no other route matches the current pathname.

```jsx
{
  path: "*",
  component: NotFound,
}
```

> [!IMPORTANT]
> If a fallback route exists, it must be the final route in the array.

---

## Validation

Before returning the final configuration, `createRoutes()` validates every route.

Validation includes:

- The argument must be an array.
- Every route must be an object.
- Every route must have a valid path.
- Every regular path must start with `/`.
- Every route must have a component.
- Duplicate paths are not allowed.
- Duplicate IDs are not allowed.
- The fallback route must be the final route.

---

## Validation Errors

### Invalid Argument

```jsx
createRoutes({
  path: "/",
  component: Home,
});
```

```text
createRoutes() expects an array of routes.
```

---

### Invalid Route Object

```jsx
createRoutes([
  null,
]);
```

```text
Route at index 0 must be object.
```

---

### Invalid Path

```jsx
createRoutes([
  {
    path: "",
    component: Home,
  },
]);
```

```text
Route at index 0 must be valid string path.
```

---

### Path Must Start With "/"

```jsx
createRoutes([
  {
    path: "about",
    component: About,
  },
]);
```

```text
Route path "about" must start with "/".
```

---

### Missing Component

```jsx
createRoutes([
  {
    path: "/about",
  },
]);
```

```text
Route "/about" must have a component.
```

---

### Duplicate Path

```jsx
createRoutes([
  {
    path: "/about",
    component: About,
  },
  {
    path: "/about",
    component: Company,
  },
]);
```

```text
Duplicate route path detected: "/about".
```

---

### Invalid ID

```jsx
createRoutes([
  {
    id: "",
    path: "/about",
    component: About,
  },
]);
```

```text
Route "/about" must have a valid string id.
```

---

### Duplicate ID

```jsx
createRoutes([
  {
    id: "about",
    path: "/about",
    component: About,
  },
  {
    id: "about",
    path: "/company",
    component: Company,
  },
]);
```

```text
Duplicate route id detected: "about".
```

---

### Invalid Fallback Position

```jsx
createRoutes([
  {
    path: "*",
    component: NotFound,
  },
  {
    path: "/about",
    component: About,
  },
]);
```

```text
The NotFound route with path "*" must be the last route.
```

---

## Immutable Routes

Every route returned by `createRoutes()` is immutable.

The route objects and the returned array are frozen using `Object.freeze()`.

> [!TIP]
> Treat the returned route configuration as read-only.

---

## Return Value

`createRoutes()` returns a frozen array of normalized route objects.

Every returned route has the following structure:

```ts
{
  id: string;
  path: string;
  component: React.ComponentType;
}
```

Even if no `id` is provided, one is generated automatically.

---

## Organizing Routes

For larger applications, store your routes in a dedicated file.

```jsx
// routes.jsx

import {
  createRoutes,
  NotFound,
} from "irux-router";

export const routes = createRoutes([
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
```

Then pass them to the router.

```jsx
import { Router } from "irux-router";
import { routes } from "./routes";

export default function App() {
  return <Router routes={routes} />;
}
```

---

## Best Practices

> [!TIP]
> Keep route definitions outside React components.

> [!TIP]
> Keep the fallback route (`*`) as the final route.

> [!TIP]
> Use descriptive IDs for manually assigned route identifiers.

> [!TIP]
> Do not modify the returned routes array.

---

## Related

- [Router](/components/router)
- [Route](/components/route)
- [NotFound](/components/not-found)