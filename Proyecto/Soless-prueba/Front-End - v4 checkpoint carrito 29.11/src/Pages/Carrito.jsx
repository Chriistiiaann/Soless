import ItemCarrito from "../components/ItemCarrito";
import "./styles/Module.Carrito.css";
import Button from "../components/Button";
import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Carrito() {
    const { cart, totalPrice, inicializarCarrito, getCartFromLocalStorage, setCart, mergeCarts } = useCartContext();
    const { user, isAuthenticated } = useAuth() || {};

    // Usamos un useEffect para cargar el carrito dependiendo del estado de autenticación
    useEffect(() => {
        if (isAuthenticated && user) {
            // Si está autenticado, inicializar carrito desde el servidor
            console.log("Cargando carrito desde el servidor...");
            // mergeCarts(user.id);
            inicializarCarrito(isAuthenticated, user.id);
        } else {
            // Si no está autenticado, cargar carrito desde localStorage
            const localCart = getCartFromLocalStorage();
            console.log("Cargando carrito desde localStorage:", localCart);
            setCart(localCart);  // Actualiza el estado del carrito
        }
    }, [isAuthenticated, user]);

    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate('/checkout');  
    };


    return (
        <div className="carrito-container">
            <div className={`carrito-items ${cart.length === 0 ? "empty" : ""}`}>
                {cart.length === 0 ? (
                    <p className="empty-cart-message">Tu carrito está vacío 🛒😒</p>
                ) : (
                    cart.map((item) => (
                        <ItemCarrito
                            key={item.productId}  // Usamos productId para evitar problemas con claves duplicadas
                            productId={item.productId}
                            productName={item.productName}
                            productImage={item.productImage}
                            productPrice={item.productPrice}
                            quantity={item.quantity}
                            totalPriceObject={item.totalPriceObject}
                        />
                    ))
                )}
            </div>
            {cart.length > 0 && (
                <div className="totalAndBuy">
                    <h2>Subtotal: {totalPrice}€</h2>
                    <Button className="big-button primary-button" text="Finalizar compra" onClick={handleNavigate} />
                </div>
            )}
        </div>
    );
}

export default Carrito;
