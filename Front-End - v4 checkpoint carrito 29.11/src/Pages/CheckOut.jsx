import React from "react";
import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider"; // Asegúrate de importar useAuth correctamente
import ItemCheckOut from "../components/ItemCheckOut";
import "./styles/Module.Checkout.css";
import Formulario_Pago from "../components/Formulario-Pago";

function Checkout() {
    const cart = useCartContext();
    const {isAuthenticated } = useAuth(); 

    const isCartEmpty = !cart.cart || cart.cart.length === 0;

    if (!isAuthenticated) {
        return (
            <div className="checkout-container">
                <div className="message-container">
                    <h1>Inicia sesión para comprar un producto</h1>
                </div>
            </div>
        );
    }

    if (isCartEmpty) {
        return (
            <div className="checkout-container">
                <div className="message-container">
                    <h1>Añade un producto al carrito para poder pagarlo</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-container">
            <div className="checkout-column-left">
                <div className="titulo-resumen-compra">
                    <h1>Resumen de tu Compra</h1>
                </div>
                <div className="checkout-items">
                    {cart.cart.map((item) => (
                        <ItemCheckOut
                            key={item.productId}
                            productId={item.productId}
                            productName={item.productName}
                            productImage={item.productImage}
                            productPrice={item.productPrice}
                            totalPriceObject={item.productPrice * item.quantity}
                            quantity={item.quantity}
                        />
                    ))}
                </div>
            </div>

            <div className="checkout-total-pay">
                <Formulario_Pago />
            </div>
        </div>
    );
}

export default Checkout;