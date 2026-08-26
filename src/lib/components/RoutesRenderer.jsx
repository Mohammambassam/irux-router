import {matchPath} from '../utils/matchPath';
import {ParamsContext} from '../context/ParamsContext';

export default function RoutesRenderer({routes , pathname}){
    let matchedRoute = null;
    let matchedParams = {};

    for(const route of routes){
        if(route.path === "*"){
            continue;
        }

        const params = matchPath(route.path, pathname);

        if(params !== null){
            matchedRoute = route;
            matchedParams = params;
            break;
        }
    }

    const notFoundRoute = routes.find(route => route.path === "*");

    if(!matchedRoute){
        matchedRoute = notFoundRoute;
        matchedParams = {};
    }

    if(!matchedRoute) return null;
    

    const Component = matchedRoute.component;

    return(
        <ParamsContext.Provider value={matchedParams}>
            <Component />
        </ParamsContext.Provider>
    )
}