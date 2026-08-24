# useLocation

The `useLocation` hook returns information about the current location.

It automatically updates whenever the current route changes.

---

## Usage

```jsx
import { useLocation } from "irux-router";

function Navbar() {
  const { pathname } = useLocation();

  return <p>{pathname}</p>;
}
```

---

## Return Value

`useLocation()` returns an object describing the current location.

**Type**

```ts
{
  pathname: string;
}
```

---

## Properties

### `pathname`

The current URL pathname.

Example:

```text
/
```

or

```text
/about
```

---

## Examples

### Display the Current Path

```jsx
function CurrentPath() {
  const { pathname } = useLocation();

  return <p>{pathname}</p>;
}
```

---

### Highlight the Active Route

```jsx
function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav>
      <Link
        to="/"
        className={pathname === "/" ? "active" : ""}
      >
        Home
      </Link>

      <Link
        to="/about"
        className={pathname === "/about" ? "active" : ""}
      >
        About
      </Link>
    </nav>
  );
}
```

---

### Conditional Rendering

```jsx
function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" && <Hero />}
    </>
  );
}
```

---

## Best Practices

> [!TIP]
> Destructure `pathname` directly from the returned object.

---

> [!TIP]
> Use `useLocation()` whenever your component depends on the current route.

---

## Common Mistakes

❌ Incorrect

```jsx
const pathname = useLocation();
```

---

✅ Correct

```jsx
const { pathname } = useLocation();
```

---

## Related

- [Router](/components/router)
- [Link](/components/link)
- [useNavigate](/hooks/use-navigate)