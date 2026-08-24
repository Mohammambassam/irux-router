# irux-router

A lightweight client-side router built for React.

**irux-router** provides a clean, predictable, and easy-to-use routing system for React applications. It supports both JSX-based routing and centralized route configuration with `createRoutes()`.

> 📚 Full documentation: **https://mohammambassam.github.io/irux-router/**

---

## Features

- ⚡ Lightweight and fast
- ⚛️ Built for React
- 🧭 Client-side routing
- 🔗 `Link` component
- 🚀 `useNavigate()` hook
- 📍 `useLocation()` hook
- 🛣️ `createRoutes()` utility
- 🚫 Built-in `NotFound` component
- 🛡️ Route validation
- 🆔 Automatic route ID generation
- 🔒 Immutable route configuration

---

## Installation

```bash
npm install irux-router
```

---

## Quick Example

```jsx
import {
  Router,
  Route,
  Link,
  NotFound,
} from "irux-router";

import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Router>
  );
}
```

---

## Route Configuration

Prefer keeping your routes in a single place? Use `createRoutes()`.

```jsx
import {
  Router,
  createRoutes,
  NotFound,
} from "irux-router";

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

## Documentation

The complete documentation includes:

- Getting Started
- Components
- Hooks
- Utilities
- API Reference
- Examples
- Changelog

📖 **https://mohammambassam.github.io/irux-router/**

---

## Included APIs

### Components

- `Router`
- `Route`
- `Link`
- `NotFound`

### Hooks

- `useNavigate()`
- `useLocation()`

### Utilities

- `createRoutes()`

---

## Browser Support

`irux-router` uses the browser History API and works in all modern browsers.

---

## License

MIT