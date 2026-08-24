import {routerError} from './routerError';
import {generateRouteId} from './generateRouteId'

export function createRoutes(routes){
    if(!Array.isArray(routes)){
        routerError('createRoutes() expects an array of routes.')
    }

    const paths = new Set();
    const ids = new Set();

    const normalizedRoutes = routes.map((route, index) => {
        if(typeof route !== "object" || route === null || Array.isArray(route)){
            routerError(`Route at index ${index} must be object.`);
        }

        const {path , component} = route;

        if(typeof path !== "string" || path.trim() === ""){
            routerError(`Route at index ${index} must be valid string path.`);
        }

        if(path !== "*" && !path.startsWith("/")){
            routerError(`Route path "${path}" must start with "/".`);
        }

        if(component === undefined || component === null){
            routerError(`Route "${path}" must have a component.`)
        }

        if(paths.has(path)){
            routerError(`Duplicate route path detected: "${path}".`)
        }

        paths.add(path);

        const id = route.id ?? generateRouteId(path);

        if(typeof id !== "string" || id.trim() === ""){
            routerError(`Route "${path}" must have a valid string id.`);
        }

        if(ids.has(id)){
            routerError(`Duplicate route id detected: "${id}".`);
        }

        ids.add(id);

        return Object.freeze({id , path, component});
    });

    const notFoundIndex = normalizedRoutes.findIndex(route => route.path === "*");

    if(notFoundIndex !== -1 && notFoundIndex !== normalizedRoutes.length -1){
        routerError(`The NotFound route with path "*" must be the last route.`);
    }

    return Object.freeze(normalizedRoutes);
}