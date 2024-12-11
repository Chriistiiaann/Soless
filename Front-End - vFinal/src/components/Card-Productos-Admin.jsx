import PropTypes from "prop-types";
import { URL_IMAGES } from "../config";

function CardProductosAdmin({ id, model, price, img_Name, description, onEdit, onDelete }) {

    const img_URL = URL_IMAGES + img_Name
    
    return (
        <div className="card-producto-admin">
            <img src={URL_IMAGES + img_Name} alt={model} className="producto-imagen" />
            <div className="producto-info">
                <h3>{model}</h3>
                <p><strong>Descripción:</strong> {description}</p>
                <p><strong>Precio:</strong> {price}€</p>
            </div>
            <div className="producto-actions">
                <button
                    className="editar-btn"
                    onClick={() => onEdit(id)}
                >
                    Editar
                </button>
                <button
                    className="eliminar-btn"
                    onClick={() => onDelete(id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

CardProductosAdmin.propTypes = {
    id: PropTypes.string.isRequired,
    model: PropTypes.string,
    price: PropTypes.number,
    img_Name: PropTypes.string,
    description: PropTypes.string,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default CardProductosAdmin;
