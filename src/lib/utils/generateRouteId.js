export function generateRouteId(path){
    if(path === "/"){
        return "root";
    }

    if(path === "*"){
        return "not-found";
    }

    return path
        .replace(/^\/+|\/+$/g, "")
        .replace(/\//g, "-")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-");
}