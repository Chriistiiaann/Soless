import "./styles/Module.ProductQuantity.css";
import PropTypes from "prop-types";

function ProductQuantity({ counter, setCounter, onQuantityChange }) {
    const increase = () => {
        const newCounter = counter + 1;
        setCounter(newCounter);
        onQuantityChange && onQuantityChange(newCounter); // Notifica el cambio
    };

    const decrease = () => {
        const newCounter = counter > 0 ? counter - 1 : 0;
        setCounter(newCounter);
        onQuantityChange && onQuantityChange(newCounter); // Notifica el cambio
    };

    return (
        <div className="product-quantity">
            <button className="product-quantity-button" onClick={decrease}>-</button>
            <input
                className="product-quantity-input"
                type="number"
                min="0"
                step="1"
                value={counter}
                readOnly
            />
            <button className="product-quantity-button" onClick={increase}>+</button>
        </div>
    );
}


ProductQuantity.propTypes = {
    counter: PropTypes.number.isRequired,
    setCounter: PropTypes.func.isRequired,
    onQuantityChange: PropTypes.func
};

export default ProductQuantity;
