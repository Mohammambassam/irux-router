# useParams

`useParams` is a hook that returns the dynamic parameters of the currently matched route.

It can be used inside components rendered by Dynamic Routes.

---

## Usage

```jsx
import { Router, Route, useParams } from "irux-router";

function User() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
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

When visiting:

```txt
/users/25
```

`useParams()` returns:

```js
{
  id: "25"
}
```

---

## Return Value

`useParams()` returns an object containing the parameters extracted from the currently matched route.

```js
const params = useParams();
```

For:

```txt
/users/:id
```

and the URL:

```txt
/users/42
```

the returned value is:

```js
{
  id: "42"
}
```

---

## Single Parameter

You can destructure a parameter directly:

```jsx
function User() {
  const { id } = useParams();

  return <p>User: {id}</p>;
}
```

Route:

```jsx
<Route path="/users/:id" component={User} />
```

URL:

```txt
/users/15
```

Result:

```js
id === "15"
```

---

## Multiple Parameters

`useParams()` supports routes containing multiple parameters.

```jsx
function Comment() {
  const { postId, commentId } = useParams();

  return (
    <div>
      <p>Post: {postId}</p>
      <p>Comment: {commentId}</p>
    </div>
  );
}
```

Route:

```jsx
<Route
  path="/posts/:postId/comments/:commentId"
  component={Comment}
/>
```

When visiting:

```txt
/posts/10/comments/7
```

the returned parameters are:

```js
{
  postId: "10",
  commentId: "7"
}
```

---

## Using with createRoutes

`useParams()` works the same way with routes created using `createRoutes()`.

```jsx
import {
  Router,
  createRoutes,
  useParams,
} from "irux-router";

function Product() {
  const { productId } = useParams();

  return <h1>Product: {productId}</h1>;
}

const routes = createRoutes([
  {
    path: "/products/:productId",
    component: Product,
  },
]);

function App() {
  return <Router routes={routes} />;
}

export default App;
```

Visiting:

```txt
/products/100
```

returns:

```js
{
  productId: "100"
}
```

---

## Static Routes

For a matched route without dynamic parameters, `useParams()` returns an empty object:

```jsx
<Route path="/about" component={About} />
```

```js
useParams();
```

returns:

```js
{}
```

---

## URL Decoding

Parameter values are automatically URL-decoded.

For example:

```txt
/users/irux%20san
```

with:

```txt
/users/:name
```

returns:

```js
{
  name: "irux san"
}
```

---

## Common Mistakes

### Using useParams outside a matched Route

Do not use `useParams()` in a component that is not rendered by a matched route.

```jsx
function App() {
  const params = useParams(); // Incorrect

  return (
    <Router>
      ...
    </Router>
  );
}
```

Instead, use it inside the route component:

```jsx
function User() {
  const { id } = useParams();

  return <h1>User: {id}</h1>;
}
```

### Using the Wrong Parameter Name

If your route is:

```txt
/users/:userId
```

use:

```js
const { userId } = useParams();
```

not:

```js
const { id } = useParams();
```

Parameter names correspond directly to the names defined in the route.

---

## Best Practices

Destructure only the parameters your component needs:

```js
const { userId } = useParams();
```

Use descriptive parameter names when a route contains multiple values:

```txt
/posts/:postId/comments/:commentId
```

Keep parameter handling inside the component responsible for the matched route.

---

## Related

- [Dynamic Routes](../features//dynamic-routes.md)
- [Router](../components/router.md)
- [Route](../components/route.md)
- [createRoutes](../utilities/create-routes.md)