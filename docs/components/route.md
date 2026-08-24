# Route

The `Route` component defines a route inside the `Router`.

When the current pathname matches the route's `path`, the associated component is rendered.

---

## Usage

```jsx
import { Router, Route } from "irux-router";

<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="*" component={NotFound} />
</Router>
```

---

## Props

### `path`

The URL path to match.

**Type**

```ts
string
```

Example:

```jsx
<Route path="/about" component={About} />
```

---

### `component`

The React component rendered when the route matches.

**Type**

```ts
React.ComponentType
```

Example:

```jsx
<Route path="/" component={Home} />
```

---

## Examples

### Home Route

```jsx
<Route path="/" component={Home} />
```

---

### About Route

```jsx
<Route path="/about" component={About} />
```

---

### Not Found Route

```jsx
<Route path="*" component={NotFound} />
```

---

## Rules

> [!IMPORTANT]
> Every `Route` must be rendered inside a `Router`.

---

> [!IMPORTANT]
> Only one route should use `path="*"`.

---

> [!TIP]
> Place the `path="*"` route after your regular routes.

---

## Common Mistakes

❌ Incorrect

```jsx
<Route component={Home} />
```

---

❌ Incorrect

```jsx
<Route path="/" />
```

---

✅ Correct

```jsx
<Route path="/" component={Home} />
```

---

## Related

- [Router](/components/router)
- [Link](/components/link)
- [createRoutes](/utilities/create-routes)