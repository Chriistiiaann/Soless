import { useState } from "react";
import "./styles/Module.ProductQuantity.css";
import PropTypes from "prop-types";

function ProductQuantity({ initialValue = 1 }) { // Valor predeterminado de 1
    const [counter, setCounter] = useState(initialValue);

    const increase = () => setCounter(prevCounter => prevCounter + 1);
    const decrease = () => setCounter(prevCounter => (prevCounter > 1 ? prevCounter - 1 : 1)); // Evitar que baje de 1

    return (
        <div className="product-quantity">
            <button className="product-quantity-button" onClick={decrease}>-</button>
            <input
                className="product-quantity-input"
                type="number"
                min="1"
                step="1"
                value={counter}
                readOnly
            />
            <button className="product-quantity-button" onClick={increase}>+</button>
        </div>
    );
}

ProductQuantity.propTypes = {
    initialValue: PropTypes.number,
};

export default ProductQuantity;


