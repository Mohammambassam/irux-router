import { useEffect, useState } from "react";
import {RouterContext} from '../context/RouterContext';
import { routerError } from "../utils/routerError";
import RoutesRenderer from "./RoutesRenderer";

export function Router({ routes ,children }) {
    const [pathname, setPathname] = useState(window.location.pathname);

    useEffect(() => {
        function handlePopState(){
            setPathname(window.location.pathname);
        }

        window.addEventListener("popstate", handlePopState);

        return () => {
            window.addEventListener("popstate", handlePopState);
        }
    },[])

    const usesRoutesProp = routes !== undefined;

    if(usesRoutesProp && children){
        routerError(`Router cannot use both the "routes" prop and route children`);
    }

    function navigate(to) {
        if (to == pathname) return;

        window.history.pushState({}, "", to);
        setPathname(to);
    }

    const value = {
        pathname,
        navigate
    }

    return (
        <RouterContext.Provider value={value}>
            {usesRoutesProp ? (<RoutesRenderer routes={routes} pathname={pathname}/>): (children)}
        </RouterContext.Provider>
    )
}
