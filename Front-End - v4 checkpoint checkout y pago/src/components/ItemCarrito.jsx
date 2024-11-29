import ProductQuantity from "./ProductQuantity"
import ShoeSizeSelector from "./ShoeSizeSelector"
import Button from "./Button"
import { useState } from "react"
import PropTypes, { func } from "prop-types"
import "./styles/Module.ItemCarrito.css"
import { URL_IMAGES } from '../config';
import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider";
import { useNavigate } from 'react-router-dom';


function ItemCarrito({productId ,productName, productImage, productPrice, totalPriceObject, quantity}) {

    const cart = useCartContext();
    const { user } = useAuth() || {};
    const [counter, setCounter] = useState(quantity);

    const userId = user.id

    /*------------------------------------------------------------*/

    const updateProductQuantity = async (userId, productId, quantity) => {
        try {
            const response = await fetch(
                `https://localhost:7200/api/Cart/update-product`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        cartId: userId,   
                        productId: productId,   
                        quantity: quantity, 
                    }),
                }
            );
    
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
    
    const handleQuantityChange = (newQuantity) => {
        setCounter(newQuantity);
    
        if (newQuantity > 0) {
            updateProductQuantity(userId, productId, newQuantity);
        } else {
            // Si la cantidad es 0, elimina el producto del carrito.
            deleteProductFromCart(userId, productId);
        }
    };
    

    const fetchCart = async () => {
        try {
            const response = await fetch(`https://localhost:7200/api/Cart/GetCart/${user.id}`);
            const data = await response.json();
            cart.setCart(data.cartProducts);
            cart.setTotalPrice(data.totalPrice);
            console.log(data);
            console.log(data.cartProducts);
        } catch (error) {
            console.error("Error al cargar los datos del carrito:", error);
        }
    };

    const deleteProductFromCart = async (userId, productId) => {
        try {
            const response = await fetch(
                `https://localhost:7200/api/Cart/cart/${userId}/product/${productId}`,
                {
                    method: 'DELETE',
                }
            );

            fetchCart();
    
            const data = await response.json();
            console.log("Producto eliminado exitosamente:", data);
    
            // Puedes agregar aquí lógica adicional para actualizar la interfaz.
        } catch (error) {
            console.error("Error al eliminar el producto del carrito:", error);
        }
    };
    
    function deleteItem() {
        deleteProductFromCart(userId, productId);
        console.log("Nuevo carrito", cart.cart);
    }
    
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/checkout');  
    };


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
                    <Button className="close-button" text="X" onClick={deleteItem}/>
                </div>
                <div className="bottom-div">
                    <ProductQuantity
                        counter={counter}
                        setCounter={handleQuantityChange}
                        onQuantityChange={(newQuantity) => handleQuantityChange(newQuantity)}
                    />
                    <ShoeSizeSelector />
                    <Button className="big-button" text="Comprar Ya" onClick={handleNavigate}/>
                </div>
            </div>
            
        </div>
    )
}

ItemCarrito.propTypes = {
    productId: PropTypes.number.isRequired,
    productName: PropTypes.string.isRequired,
    productImage: PropTypes.string.isRequired,
    productPrice: PropTypes.number.isRequired,
    totalPriceObject: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
}

export default ItemCarrito