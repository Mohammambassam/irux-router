import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useState
} from "react";

import { RouterContext } from "../context/RouterContext";
import { routerError } from "../utils/routerError";
import { matchPath } from "../utils/matchPath";
import RoutesRenderer from "./RoutesRenderer";

export function Router({ routes, children }) {
  const [pathname, setPathname] = useState(
    window.location.pathname
  );

  useEffect(() => {
    function handlePopState() {
      setPathname(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const usesRoutesProp = routes !== undefined;

  if (usesRoutesProp && children) {
    routerError(
      'Router cannot use both the "routes" prop and route children'
    );
  }

  function navigate(to) {
    if (to === pathname) return;

    window.history.pushState({}, "", to);
    setPathname(window.location.pathname);
  }

  const value = {
    pathname,
    navigate
  };

  if (usesRoutesProp) {
    return (
      <RouterContext.Provider value={value}>
        <RoutesRenderer
          routes={routes}
          pathname={pathname}
        />
      </RouterContext.Provider>
    );
  }

  const routeChildren = Children.toArray(children)
    .filter(isValidElement);

  const hasMatch = routeChildren.some((child) => {
    if (child.props.path === "*") {
      return false;
    }

    return matchPath(
      child.props.path,
      pathname
    ) !== null;
  });

  return (
    <RouterContext.Provider value={value}>
      {routeChildren.map((child) =>
        cloneElement(child, { hasMatch })
      )}
    </RouterContext.Provider>
  );
}