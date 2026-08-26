import { useParams } from "../lib";

export default function User(){
    const params = useParams();

    return <h1>ID: {params.id}</h1>
}