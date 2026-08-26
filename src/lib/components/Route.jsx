import {useLocation} from '../hooks/useLocation';
import { matchPath } from '../utils/matchPath';
import {ParamsContext} from '../context/ParamsContext'

export function Route({path, component: Component, hasMatch}){
    const {pathname} = useLocation();

    if(path === "*"){
        if(hasMatch){
            return null
        }

        return (
            <ParamsContext.Provider value={{}}>
                <Component />
            </ParamsContext.Provider>
        );
    }

    const params = matchPath(path, pathname);

    if(params === null) return null;

    return(
        <ParamsContext.Provider value={params}>
            <Component />
        </ParamsContext.Provider>
    )
}