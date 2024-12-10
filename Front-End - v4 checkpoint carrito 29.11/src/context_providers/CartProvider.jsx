import { useState, useEffect, createContext, useContext } from "react";
import propTypes from "prop-types";
import	{ GET_CART_ENDPOINT, ADD_TO_CART_ENDPOINT, GET_SHOE_BY_ID_ENDPOINT } from "../config";

const CartContext = createContext();
export function useCartContext() {
    return useContext(CartContext);
}

function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        return JSON.parse(localStorage.getItem("carrito")) || [];
    });

    const [totalPrice, setTotalPrice] = useState(0);
    const numItems = cart.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("carrito"));
        if (JSON.stringify(storedCart) !== JSON.stringify(cart)) {
            console.log("Actualizando localStorage con carrito:", cart);
            localStorage.setItem("carrito", JSON.stringify(cart));
        }
    }, [cart]);
    

    const inicializarCarrito = (isAuthenticated, userId) => {
        if (isAuthenticated) {
            fetchCart(userId);
        } else {
            const cartFromLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
            setCart(cartFromLocalStorage);
            setTotalPrice(cartFromLocalStorage.reduce((total, item) => total + item.totalPriceObject, 0));
        }
    };

    const mergeCarts = (userId) => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem('carrito')) || [];
            if (cartFromLocalStorage.length > 0) {
                console.log("Items en local storage detectados", cartFromLocalStorage);
                cartFromLocalStorage.forEach((item) => {
                    console.log("Agregando item:", item);
                    addProductToCart(userId, item.productId, item.quantity);
                })
            }
    };

    const fetchCart = async (userId) => {
        try {
            const response = await fetch(`${GET_CART_ENDPOINT}${userId}`);
            const data = await response.json();
            setCart(data.cartProducts);
            setTotalPrice(data.totalPrice);
        } catch (error) {
            console.error("Error al cargar los datos del carrito:", error);
        }
    };

    const addProductToCart = async (userId, productId, quantity) => {
        if (userId) {
            try {
                const response = await fetch(`${ADD_TO_CART_ENDPOINT}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        cartId: userId,
                        productId,
                        quantity,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Error al añadir el producto: ${response.status}`);
                } else {
                    console.log("Producto agregado exitosamente");
                }

                fetchCart(userId);
            } catch (error) {
                console.error("Error al añadir producto al carrito:", error);
            }
        } 
    };

    const getItemFromDatabase = async (productId, quantity) => {
        try {
            const response = await fetch(`${GET_SHOE_BY_ID_ENDPOINT}${productId}`);
            const data = await response.json();
            console.log("item del back", data);

            const newCartItem = {
                productId: data.id,
                productName: data.model,
                productImage: data.img_Name,
                productPrice: data.original_Price,
                quantity,
                totalPriceObject: data.original_Price * quantity,
            };
            console.log("item para agregar", newCartItem);
            setCart((prevCart) => [...prevCart, newCartItem]);
        } catch (error) {
            console.error("Error al obtener el producto de la base de datos:", error);
        }
    };

    const addProductToCartNoUser = (productId, quantity) => {
        console.log("Carrito actual:", cart);
        console.log("ProductId buscado:", productId);
        const existingItem = cart.find((item) => Number(item.productId) === Number(productId));
        console.log("Resultado de búsqueda:", existingItem);

        if (existingItem) {
            console.log("El producto ya existe en el carrito. Actualizando cantidad...");
            setCart((prevCart) =>
                prevCart.map((item) =>
                    Number(item.productId) === Number(productId)
                        ? {
                                ...item,
                                quantity: item.quantity + quantity,
                                totalPriceObject: item.totalPriceObject + item.productPrice * quantity,
                        }
                        : item
                )
            );
            localStorage.setItem("carrito", JSON.stringify(cart));
        } else {
            console.log("El producto no existe en el carrito. Agregando desde la base de datos...");
            getItemFromDatabase(productId, quantity);
            localStorage.setItem("carrito", JSON.stringify(cart));
        }
    };

    const getCartFromLocalStorage = () => {
        const storedCart = localStorage.getItem("carrito");
        return storedCart ? JSON.parse(storedCart) : [];
    };

    const removeProductFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
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

    return (
        <CartContext.Provider
            value={{
                cart,
                setCart,
                totalPrice,
                setTotalPrice,
                numItems,
                fetchCart,
                mergeCarts,
                inicializarCarrito,
                addProductToCart,
                addProductToCartNoUser,
                removeProductFromCart,
                updateCartItemQuantity,
                getCartFromLocalStorage
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
