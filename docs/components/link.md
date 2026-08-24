# Link

The `Link` component enables client-side navigation without reloading the page.

It behaves like a standard HTML `<a>` element while using the browser History API for smooth navigation.

---

## Usage

```jsx
import { Link } from "irux-router";

<Link to="/about">
  About
</Link>
```

---

## Props

### `to`

The destination path.

**Type**

```ts
string
```

Example:

```jsx
<Link to="/about">
  About
</Link>
```

---

### `children`

The content displayed inside the link.

**Type**

```ts
React.ReactNode
```

Example:

```jsx
<Link to="/">
  Home
</Link>
```

---

## Examples

### Basic Link

```jsx
<Link to="/">
  Home
</Link>
```

---

### Navigation Menu

```jsx
<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
</nav>
```

---

### Styled Link

```jsx
<Link
  to="/about"
  className="nav-link"
>
  About
</Link>
```

---

## Rules

> [!IMPORTANT]
> `Link` must be used inside a `Router`.

---

> [!TIP]
> Use `Link` instead of a regular `<a>` element when navigating between pages inside your application.

---

> [!TIP]
> `Link` performs client-side navigation without refreshing the page.

---

## Common Mistakes

❌ Incorrect

```jsx
<Link>
  About
</Link>
```

---

❌ Incorrect

```jsx
<Link to="">
  About
</Link>
```

---

✅ Correct

```jsx
<Link to="/about">
  About
</Link>
```

---

## Related

- [Router](/components/router)
- [Route](/components/route)
- [useNavigate](/hooks/use-navigate)