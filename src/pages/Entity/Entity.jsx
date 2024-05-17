import "./Entity.css";
import { useParams } from 'react-router-dom';

export const Entity = () => {
    let { type } = useParams();
    return (
        <div className="entityDesign">
            <h2 className="entityHeader">{type}</h2>
        </div>
    )
}