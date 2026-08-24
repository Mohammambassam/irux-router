import { useContext } from "react";
import {RouterContext} from "../context/RouterContext";

export function useLocation(){
    const context = useContext(RouterContext);

    if(!context) throw new Error("Cannot read properties of null");

    return {pathname: context.pathname}
}