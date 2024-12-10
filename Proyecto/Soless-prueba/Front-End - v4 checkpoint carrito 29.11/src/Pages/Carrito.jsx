import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemCarrito from "../components/ItemCarrito";
import "./styles/Module.Carrito.css";
import Button from "../components/Button";

function Carrito() {
    const { cart, totalPrice, inicializarCarrito, setCart, mergeCarts } = useCartContext();
    const { user, isAuthenticated } = useAuth() || {};
    const navigate = useNavigate();

    // Usamos un useEffect para cargar el carrito dependiendo del estado de autenticación
    useEffect(() => {
        // Si el usuario está autenticado y tiene un id de usuario, fusiona el carrito local con el remoto
        if (isAuthenticated && user) {
            console.log("Usuario autenticado. Sincronizando carritos...");
            mergeCarts(user.id); // Fusiona el carrito local con el remoto
        } else {
            // Si no está autenticado, simplemente cargamos el carrito local
            const localCart = JSON.parse(localStorage.getItem("carrito")) || [];
            console.log("Cargando carrito desde localStorage:", localCart);
            setCart(localCart); // Actualiza el estado del carrito
        }
    }, [isAuthenticated, user, mergeCarts, setCart]);

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
