import { useState, createContext, useContext } from "react";
import propTypes from "prop-types";

const CartContext = createContext();
export function useCartContext() {
    return useContext(CartContext);
}

function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const fetchCart = async (userId) => {
        try {
            const response = await fetch(`https://localhost:7200/api/Cart/GetCart/${userId}`);
            const data = await response.json();
            setCart(data.cartProducts);
            setTotalPrice(data.totalPrice);
        } catch (error) {
            console.error("Error al cargar los datos del carrito:", error);
        }
    };

    const inicializarCarrito = (isAuthenticated, userId) => {
        if (!isAuthenticated) {
            if (!localStorage.getItem("carrito")) {
                localStorage.setItem("carrito", JSON.stringify([]));
            }
        } else {
            fetchCart(userId);
        }
    };

    const updateCartItemQuantity = (productId, quantity) => {
        setCart((prevCart) =>
            prevCart
                .map((item) =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const updatedCart = prevCart.filter((item) => item.productId !== productId);
            console.log(updatedCart);
            return updatedCart;
        });
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

    const addProductToCart = async (userId, productId, quantity = 1) => {
        try {
            const response = await fetch(`https://localhost:7200/api/Cart/AddToCart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    cartId: userId,
                    productId,
                    quantity,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error al añadir el producto: ${response.status}`);
            }

            const data = await response.json();
            console.log("Producto añadido al carrito exitosamente:", data);

            // Actualizar el carrito local
            fetchCart(userId);

            return data;
        } catch (error) {
            console.error("Error al añadir el producto al carrito:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                totalPrice,
                setTotalPrice,
                fetchCart,
                inicializarCarrito,
                updateCartItemQuantity,
                removeFromCart,
                addProductToCart,
                deleteProductFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}


CartProvider.propTypes = {
    children: propTypes.node.isRequired,
};

export default CartProvider;
