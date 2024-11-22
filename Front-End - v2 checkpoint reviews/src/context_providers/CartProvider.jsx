import { useState, createContext, useContext } from "react";
import propTypes from 'prop-types'

const CartContext = createContext();
export function useCartContext() {
    return useContext(CartContext);
}

function CartProvider({children}) {
    const [cart, setCart] = useState([]);

    const [totalPrice, setTotalPrice] = useState(64000);

    return (
        <CartContext.Provider value={{cart, setCart, totalPrice, setTotalPrice}}>
            {children}
        </CartContext.Provider>
        
    )
}

CartProvider.propTypes = {
    children: propTypes.node.isRequired
}

export default CartProvider