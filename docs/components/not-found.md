# NotFound

The `NotFound` component renders a customizable fallback page for unmatched routes.

It provides a ready-to-use **404 page** with support for custom content, styling, and navigation.

---

## Usage

```jsx
import { NotFound } from "irux-router";

<Route path="*" component={NotFound} />
```

---

## Props

### `title`

The main heading displayed on the page.

**Type**

```ts
string
```

**Default**

```text
404
```

---

### `message`

The message displayed below the title.

**Type**

```ts
string
```

**Default**

```text
Page Not Found
```

---

### `badgeText`

Displays a small badge above the title.

**Type**

```ts
string
```

**Default**

```text
Error
```

---

### `buttonText`

The text displayed inside the navigation button.

**Type**

```ts
string
```

**Default**

```text
Back to Home
```

---

### `buttonTo`

The destination path of the navigation button.

**Type**

```ts
string
```

**Default**

```text
/
```

---

### `showButton`

Shows or hides the navigation button.

**Type**

```ts
boolean
```

**Default**

```text
true
```

---

### `className`

Adds custom CSS classes to the root element.

**Type**

```ts
string
```

**Default**

```text
""
```

---

### `children`

Renders additional custom content inside the page.

**Type**

```ts
React.ReactNode
```

---

## Examples

### Default

```jsx
<Route path="*" component={NotFound} />
```

---

### Custom Title

```jsx
<NotFound title="Oops!" />
```

---

### Custom Message

```jsx
<NotFound
  message="This page does not exist."
/>
```

---

### Custom Button

```jsx
<NotFound
  buttonText="Go Home"
  buttonTo="/"
/>
```

---

### Hide Button

```jsx
<NotFound
  showButton={false}
/>
```

---

### Custom Badge

```jsx
<NotFound
  badgeText="404"
/>
```

---

### Custom Content

```jsx
<NotFound>
  <p>Please check the URL and try again.</p>
</NotFound>
```

---

## Best Practices

> [!TIP]
> Use `NotFound` as the fallback route with `path="*"`.

> [!TIP]
> Provide a navigation button so users can easily return to a valid page.

> [!TIP]
> Keep the message short and user-friendly.

---

---

## Custom 404 Pages

The built-in `NotFound` component is provided as a convenient default.

If you need complete control over the design or behavior of your 404 page, you can create your own React component and use it as the fallback route.

```jsx
function MyNotFound() {
  return <h1>404 - Page Not Found</h1>;
}

<Route path="*" component={MyNotFound} />
```

> [!NOTE]
> The built-in `NotFound` component is completely optional. You are free to create and use your own custom 404 page.



## Related

- [Router](/components/router)
- [Route](/components/route)
- [Link](/components/link)