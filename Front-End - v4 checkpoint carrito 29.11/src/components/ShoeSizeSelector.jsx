import { useState } from "react";
import "./styles/Module.ShoeSizeSelector.css";

function ShoeSizeSelector({ onSizeChange }) {
    const [selectedSize, setSelectedSize] = useState("");

    const shoeSizes = [
        36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46
    ];

    const handleChange = (event) => {
        const size = event.target.value;
        setSelectedSize(size);
        if (onSizeChange) {
            onSizeChange(size); // Callback para manejar la talla seleccionada
        }
    };

    return (
        <div className="shoe-size-selector">
            <label htmlFor="shoeSize"></label>
            <select
                id="shoeSize"
                value={selectedSize}
                onChange={handleChange}
            >
                <option value="">-- Talla --</option>
                {shoeSizes.map(size => (
                    <option key={size} value={size}>
                        {size} EU
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ShoeSizeSelector;
