export function generateRouteId(path) {
  if (path === "/") {
    return "root";
  }

  if (path === "*") {
    return "not-found";
  }

  return path
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .map((segment) => {
      if (segment.startsWith(":")) {
        return `param-${segment.slice(1)}`;
      }

      return segment;
    })
    .join("-")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .replace(/-+/g, "-");
}