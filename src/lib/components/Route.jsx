import {useLocation} from '../hooks/useLocation';
import { matchPath } from '../utils/matchPath';

export function Route({path, component}){
    const {pathname} = useLocation()

    const isMatch = matchPath(path, pathname)

    if(!isMatch) return null;

    return component;
}