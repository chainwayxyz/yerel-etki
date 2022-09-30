// Simple home page component with h1 and h5 tags

import {  useParams
} from "react-router-dom";

export default function Fonlama() {
    let { id } = useParams();
    return (
        <div>
            <h1>Home</h1>
            <h5>{id}</h5>
        </div>
    )
}