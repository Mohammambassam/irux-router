import type {
  AnchorHTMLAttributes,
  ComponentType,
  ReactElement,
  ReactNode,
} from "react";

/* ========================================
   Routes
======================================== */

export interface RouteConfig {
  id?: string;
  path: string;
  component: ComponentType<any>;
}

export interface NormalizedRouteConfig {
  readonly id: string;
  readonly path: string;
  readonly component: ComponentType<any>;
}

/* ========================================
   Router
======================================== */

export interface RouterWithRoutesProps {
  routes: readonly RouteConfig[];
  children?: never;
}

export interface RouterWithChildrenProps {
  routes?: never;
  children: ReactNode;
}

export type RouterProps =
  | RouterWithRoutesProps
  | RouterWithChildrenProps;

export declare function Router(
  props: RouterProps
): ReactElement | null;

/* ========================================
   Route
======================================== */

export interface RouteProps {
  path: string;
  component: ComponentType<any>;
}

export declare function Route(
  props: RouteProps
): ReactElement | null;

/* ========================================
   Link
======================================== */

export interface LinkProps
  extends Omit<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    "href"
  > {
  to: string;
}

export declare function Link(
  props: LinkProps
): ReactElement;

/* ========================================
   NotFound
======================================== */

export interface NotFoundProps {
  title?: string;
  message?: string;
}

export declare function NotFound(
  props: NotFoundProps
): ReactElement;

/* ========================================
   useNavigate
======================================== */

export type NavigateFunction = (to: string) => void;

export declare function useNavigate(): NavigateFunction;

/* ========================================
   useLocation
======================================== */

export interface LocationValue {
  pathname: string;
}

export declare function useLocation(): LocationValue;

/* ========================================
   useParams
======================================== */

export type Params = Record<string, string>;

export declare function useParams<
  T extends Params = Params
>(): T;

/* ========================================
   createRoutes
======================================== */

export declare function createRoutes(
  routes: readonly RouteConfig[]
): readonly NormalizedRouteConfig[];