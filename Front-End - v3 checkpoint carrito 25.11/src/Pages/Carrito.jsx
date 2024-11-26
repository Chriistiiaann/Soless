import ItemCarrito from "../components/ItemCarrito";
import "./styles/Module.Carrito.css";
import Button from "../components/Button";
import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider";
import { useEffect } from "react";

function Carrito() {
    const { cart, totalPrice, inicializarCarrito } = useCartContext();
    const { user, isAuthenticated } = useAuth() || {};

    useEffect(() => {
        if (user) {
            inicializarCarrito(isAuthenticated, user.id);
        }
    }, [isAuthenticated, user]);

    return (
        <div className="carrito-container">
            <div className={`carrito-items ${cart.length === 0 ? "empty" : ""}`}>
                {cart.length === 0 ? (
                    <p className="empty-cart-message">Tu carrito está vacío 🛒😒</p>
                ) : (
                    cart.map((item) => (
                        <ItemCarrito
                            key={item.productName}
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
                    <Button className="big-button primary-button" text="Finalizar compra" onClick={() => {}} />
                </div>
            )}
        </div>
    );
}

export default Carrito;
