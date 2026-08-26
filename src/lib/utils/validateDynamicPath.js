import {routerError} from './routerError'

export function validateDynamicPath(path){
    if(path === "*"){
        return;
    }

    const segments = path.split("/");
    const paramNames = new Set();

    for(const segment of segments){
        if(!segment.startsWith(":")){
            continue;
        };

        const paramName = segment.slice(1);

        if(paramName === ""){
            routerError(`Dynamic route parameter in path "${path}" must have a name.`);
        }

        if(!/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(paramName)){
            routerError(`Invalid dynamic route parameter "${paramName}" in path "${path}".`);
        }

        if(paramNames.has(paramName)){
            routerError(`Duplicate dynamic route parameter "${paramName}" in path "${path}".`);
        }

        paramNames.add(paramName);
    }
}