# useNavigate

The `useNavigate` hook allows you to navigate programmatically within your application.

Unlike the `Link` component, `useNavigate` is typically used after an action such as submitting a form, clicking a button, or completing an asynchronous operation.

---

## Usage

```jsx
import { useNavigate } from "irux-router";

function Home() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate("/about")}>
      Go to About
    </button>
  );
}
```

---

## Return Value

`useNavigate` returns a function.

```ts
(path: string) => void
```

---

## Examples

### Navigate on Button Click

```jsx
const navigate = useNavigate();

<button onClick={() => navigate("/about")}>
  About
</button>
```

---

### Navigate After Login

```jsx
const navigate = useNavigate();

async function handleLogin() {
  await login();

  navigate("/dashboard");
}
```

---

### Navigate After Form Submission

```jsx
const navigate = useNavigate();

function handleSubmit() {
  saveData();

  navigate("/");
}
```

---

## When to Use

Use `useNavigate` when navigation should happen in response to application logic.

Examples include:

- Form submission
- Login or logout
- API requests
- Button clicks
- Timers
- Redirects

---

## Common Mistakes

❌ Incorrect

```jsx
const navigate = useNavigate();

navigate("/about");
```

Calling `navigate()` during rendering causes immediate navigation.

---

✅ Correct

```jsx
<button onClick={() => navigate("/about")}>
  About
</button>
```

---

## Best Practices

> [!TIP]
> Use `Link` for normal page navigation.

> [!TIP]
> Use `useNavigate` only when navigation depends on application logic.

---

## Related

- [Link](/components/link)
- [Router](/components/router)