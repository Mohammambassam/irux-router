import { useContext } from "react";
import {ParamsContext} from '../context/ParamsContext';
import {routerError} from '../utils/routerError';

export function useParams(){
    const params = useContext(ParamsContext);

    if(params === null){
        routerError(`useParams() must be used inside a matched Route.`);
    }

    return params;
}