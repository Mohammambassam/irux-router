# Quick Start

This guide walks you through creating your first application with **irux-router**.

## Import Components

Start by importing the components you need.

```jsx
import { Router, Route, Link } from "irux-router";
```

---

## Create Your Pages

Create two simple React components.

```jsx
function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}
```

---

## Configure the Router

Wrap your application with `Router` and define your routes.

```jsx
export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}
```

---

## Run the Application

Start your development server.

```bash
npm run dev
```

Open your browser and verify that navigation works correctly.

---

## What's Next?

Now that you've created your first application, continue to the component documentation to learn more about each part of the API.

Continue to **[Features](../features/dynamic-routes.md)**.