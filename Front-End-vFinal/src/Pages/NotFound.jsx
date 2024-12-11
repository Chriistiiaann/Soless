import { Link } from "react-router-dom";
import "./styles/Module.NotFound.css"

export default function NotFound() {
    return (
        <div className="not-found-container">
        <h1 className="not-found-title">
            404
        </h1>
        <h2>Página No Encontrada</h2>
        <p>
            ¡Ups! La página que estás buscando no existe.
        </p>
        <Link to="/" className="not-found-link big-button">
            Volver al Inicio
        </Link>
        </div>
    );
}
