import { useContext } from "react";
import {RouterContext} from "../context/RouterContext";

export function useNavigate(){
    const context = useContext(RouterContext);

    if(!context) throw new Error("Cannot read properties of null");

    return context.navigate;
}