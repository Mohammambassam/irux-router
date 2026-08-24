export default function RoutesRenderer({routes , pathname}){
    const matchedRoute = routes.find(route => route.path === pathname);
    const notFoundRoute = routes.find(route => route.path === "*");

    console.log({
    routes,
    pathname,
    matchedRoute,
    notFoundRoute,
  });
  
    const selectedRoute = matchedRoute ?? notFoundRoute;

    if(!selectedRoute){
        return null;
    }

    const Component = selectedRoute.component;

    return <Component />;
}