# Dynamic Routes

Dynamic Routes allow you to create routes that contain dynamic values using parameters.

A dynamic parameter starts with `:` and matches a single segment of the URL.

For example:

```txt
/users/:id
```

can match:

```txt
/users/1
/users/25
/users/irux
```

---

## Usage

Define a dynamic route by adding `:` before the parameter name:

```jsx
import { Router, Route } from "irux-router";

function User() {
  return <h1>User Page</h1>;
}

function App() {
  return (
    <Router>
      <Route path="/users/:id" component={User} />
    </Router>
  );
}

export default App;
```

Here, `:id` represents a dynamic value.

---

## Dynamic Parameters

A parameter can appear inside a route as its own path segment.

For example:

```txt
/users/:id
```

When visiting:

```txt
/users/42
```

the route matches and extracts:

```js
{
  id: "42"
}
```

You can access the extracted parameters using [`useParams`](../hooks/use-params.md).

---

## Multiple Parameters

A route can contain multiple dynamic parameters:

```jsx
<Route
  path="/posts/:postId/comments/:commentId"
  component={Comment}
/>
```

Visiting:

```txt
/posts/10/comments/5
```

produces:

```js
{
  postId: "10",
  commentId: "5"
}
```

Each parameter must have a unique name within the same route.

---

## Using with createRoutes

Dynamic Routes also work with `createRoutes()`:

```jsx
import { Router, createRoutes } from "irux-router";

import User from "./pages/User";

const routes = createRoutes([
  {
    path: "/users/:id",
    component: User,
  },
]);

function App() {
  return <Router routes={routes} />;
}

export default App;
```

Both route definition styles support Dynamic Routes.

---

## Route Matching

Dynamic parameters match exactly one URL segment.

This route:

```txt
/users/:id
```

matches:

```txt
/users/10
/users/irux
/users/profile
```

But does not match:

```txt
/users
/users/10/settings
/posts/10
```

Static segments must still match exactly.

For example:

```txt
/posts/:id/edit
```

matches:

```txt
/posts/15/edit
```

but does not match:

```txt
/posts/15/delete
```

---

## Trailing Slashes

Trailing slashes are normalized during route matching.

These paths are treated as equivalent:

```txt
/users/25
/users/25/
```

Both match:

```txt
/users/:id
```

---

## URL Decoding

Dynamic parameter values are automatically decoded.

For example:

```txt
/users/irux%20san
```

with:

```txt
/users/:name
```

produces:

```js
{
  name: "irux san"
}
```

---

## Parameter Rules

Parameter names must be valid identifiers.

### Valid

```txt
/users/:id
/users/:userId
/users/:user_id
/posts/:postId/comments/:commentId
```

### Invalid

```txt
/users/:
/users/:123
/users/:user-id
/posts/:id/comments/:id
```

A parameter:

- Must have a name.
- Cannot start with a number.
- Cannot contain invalid characters such as `-`.
- Cannot be duplicated within the same route.

Invalid Dynamic Routes created using `createRoutes()` throw an `irux-router` error.

---

## Generated Route IDs

When using `createRoutes()`, dynamic parameters are represented using `param` in generated route IDs.

For example:

```txt
/users/:id
```

generates:

```txt
users-param-id
```

And:

```txt
/posts/:postId/comments/:commentId
```

generates:

```txt
posts-param-postId-comments-param-commentId
```

This prevents ID collisions between static and dynamic routes such as:

```txt
/users/id
/users/:id
```

---

## Best Practices

Use descriptive parameter names:

```txt
/products/:productId
```

instead of:

```txt
/products/:id
```

when additional context makes the route easier to understand.

Keep dynamic routes predictable and avoid unnecessary parameters.

Use `useParams()` inside the matched component to access parameter values.

---

## Related

- [Router](../components/router.md)
- [Route](../components/route.md)
- [useParams](../hooks/use-params.md)
- [createRoutes](../utilities/create-routes.md)