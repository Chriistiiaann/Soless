import { useState, useEffect, createContext, useContext } from "react";
import propTypes from "prop-types";

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
        localStorage.setItem("carrito", JSON.stringify(cart));
    }, [cart]);

    const inicializarCarrito = (isAuthenticated, userId) => {
        if (isAuthenticated) {
            fetchCart(userId);
        } else {
            const cartFromLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
            setCart(cartFromLocalStorage);
            setTotalPrice(cartFromLocalStorage.reduce((total, item) => total + item.totalPriceObject, 0));
        }
    };

    const mergeCarts = async (userId) => {
        const cartFromLocalStorage = JSON.parse(localStorage.getItem("carrito")) || [];
        if (cartFromLocalStorage.length === 0) return;
    
        try {
            const response = await fetch(`https://localhost:7200/api/Cart/GetCart/${userId}`);
            const { cartProducts } = await response.json();
    
            // Filtra los productos que ya están en el carrito remoto para evitar duplicados
            const productsToAdd = cartFromLocalStorage.filter(localItem =>
                !cartProducts.some(serverItem => serverItem.productId === localItem.productId)
            );
    
            // Añadir productos que no estén en el carrito remoto
            for (const item of productsToAdd) {
                await addProductToCart(userId, item.productId, item.quantity);
            }
    
            // Después de añadir los productos, elimina el carrito del localStorage y recarga el carrito desde el servidor
            localStorage.removeItem("carrito");
            await fetchCart(userId);
        } catch (error) {
            console.error("Error durante la sincronización del carrito:", error);
        }
    };
    
    
    

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

    const addProductToCart = async (userId, productId, quantity) => {
        if (userId) {
            try {
                const response = await fetch(`https://localhost:7200/api/Cart/AddToCart`, {
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
            const response = await fetch(`https://localhost:7200/api/Product/id?id=${productId}`);
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
        } else {
            console.log("El producto no existe en el carrito. Agregando desde la base de datos...");
            getItemFromDatabase(productId, quantity);
        }
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

    const handleUserLogin = async (credentials) => {
        try {
            const response = await fetch("https://localhost:7200/api/Auth/Login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            if (!response.ok) throw new Error("Error during login");
    
            const { user, token } = await response.json();
            setUser(user); // Guarda la información del usuario autenticado
            setIsAuthenticated(true); // Actualiza el estado de autenticación
            localStorage.setItem("token", token); // Opcional: guarda el token si lo necesitas
    
            // Fusiona los carritos después de iniciar sesión
            mergeCarts(user.id);
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
        }
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
                handleUserLogin,
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
