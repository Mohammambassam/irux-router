function normalizePath(path){
    if(path === "/"){
        return "/";
    }

    return path.replace(/\/+$/, "");
}

export function matchPath(routePath, pathname){
    const normalizedRoutePath = normalizePath(routePath);
    const normalizedPathname = normalizePath(pathname);

    const routeSegments = normalizedRoutePath.split("/");
    const pathnameSegments = normalizedPathname.split("/");

    if(routeSegments.length !== pathnameSegments.length){
        return null;
    }

    const params = {};

    for(let i = 0; i < routeSegments.length; i++){
        const routeSegment = routeSegments[i];
        const pathnameSegment = pathnameSegments[i];

        if(routeSegment.startsWith(":")){
            const paramName = routeSegment.slice(1);

            if(!paramName || !pathnameSegment){
                return null
            }

            try {
                params[paramName] = decodeURIComponent(pathnameSegment); 
            } catch {
                params[paramName] = pathnameSegment;
            } 
            
            continue;
        }

        if(routeSegment !== pathnameSegment){
            return null;
        }
    }

    return params;
}