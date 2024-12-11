import ProductQuantity from "./ProductQuantity"
import Button from "./Button"
import { useState } from "react"
import PropTypes from "prop-types"
import "./styles/Module.ItemCarrito.css"
import { URL_IMAGES } from '../config';
import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider";
import { PUT_CART_ENDPOINT, GET_CART_ENDPOINT, UPDATE_CART_PRODUCT_ENDPOINT} from '../config';

function ItemCarrito({ productId, productName, productImage, productPrice, totalPriceObject, quantity }) {
    const { cart, setCart, setTotalPrice } = useCartContext();
    const { user, isAuthenticated } = useAuth() || {}; 
    const [counter, setCounter] = useState(quantity);

    const userId = user?.id || null;

    // Función para guardar el carrito actualizado en localStorage
    const saveCartToLocalStorage = (updatedCart) => {
        localStorage.setItem("carrito", JSON.stringify(updatedCart));
        setCart(updatedCart);  // Actualiza el estado local
        setTotalPrice(updatedCart.reduce((total, item) => total + item.totalPriceObject, 0));  // Actualiza el precio total
    };

    /*------------------------------------------------------------*/

    // Actualiza la cantidad de un producto en el carrito (cuando el usuario está autenticado)
    const updateProductQuantity = async (userId, productId, quantity) => {
        try {
            const response = await fetch(PUT_CART_ENDPOINT, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartId: userId,
                    productId: productId,
                    quantity: quantity,
                }),
            });

            if (!response.ok) {
                throw new Error("Error al actualizar la cantidad del producto.");
            }

            // Recargar el carrito actualizado desde la API
            fetchCart();
            console.log("Cantidad actualizada exitosamente");
        } catch (error) {
            console.error("Error al actualizar la cantidad del producto:", error);
        }
    };

    // Actualiza la cantidad cuando se cambia
    const handleQuantityChange = (newQuantity) => {
        setCounter(newQuantity);
        
        if (newQuantity > 0) {
            if (isAuthenticated) {
                // Si está autenticado, actualizar en el backend
                updateProductQuantity(userId, productId, newQuantity);
            } else {
                // Si no está autenticado, actualizar en el carrito local
                const updatedCart = cart.map(item =>
                    item.productId === productId ? { ...item, quantity: newQuantity, totalPriceObject: newQuantity * productPrice } : item
                );
                saveCartToLocalStorage(updatedCart);
            }
        } else {
            // Si la cantidad es 0, elimina el producto del carrito
            deleteProductFromCart(productId);
        }
    };

    // Función para cargar el carrito desde el servidor (solo si está autenticado)
    const fetchCart = async () => {
        if (!isAuthenticated) return;
        try {
            const response = await fetch(GET_CART_ENDPOINT + user.id);
            const data = await response.json();
            setCart(data.cartProducts);
            setTotalPrice(data.totalPrice);
        } catch (error) {
            console.error("Error al cargar los datos del carrito:", error);
        }
    };

    // Elimina el producto del carrito
    const deleteProductFromCart = async (productId) => {
        if (isAuthenticated) {
            try {
                const response = await fetch(UPDATE_CART_PRODUCT_ENDPOINT(userId, productId), {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar el producto del carrito.");
                }

                // Recargar el carrito actualizado desde la API
                fetchCart();
                console.log("Producto eliminado exitosamente");
            } catch (error) {
                console.error("Error al eliminar el producto del carrito:", error);
            }
        } else {
            // Si no está autenticado, eliminar el producto del carrito en localStorage
            const updatedCart = cart.filter(item => item.productId !== productId);
            saveCartToLocalStorage(updatedCart);
        }
    };

    // Función para eliminar un item del carrito
    function deleteItem() {
        deleteProductFromCart(productId);
    }

    /*------------------------------------------------------------*/

    return (
        <div className="itemCarrito" id={productId}>
            <img className="cartItemImage" src={URL_IMAGES + productImage} alt="product image" />
            <div className="productInfo">
                <div className="top-div">
                    <h3 className="productName">{productName}</h3>
                    <div className="price-container">
                        <p className="productPrice">Ud. {productPrice}€</p>
                        <p className="productTotal">Total: {totalPriceObject}€</p>
                    </div>
                </div>
                <div className="bottom-div">
                    <ProductQuantity
                        counter={counter}
                        setCounter={handleQuantityChange}
                        onQuantityChange={(newQuantity) => handleQuantityChange(newQuantity)}
                    />
                    <Button className="big-button" text="Comprar Ya" onClick={() => { }} />
                </div>
            </div>
            <Button className="close-button" text="X" onClick={deleteItem} />
        </div>
    );
}

ItemCarrito.propTypes = {
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    totalPriceObject: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
};

export default ItemCarrito;
