import ItemCarrito from "../components/ItemCarrito"
import "./styles/Module.Carrito.css"
import Button from "../components/Button"

import { useCartContext } from "../context_providers/CartProvider"

function Carrito (){

    const cart = useCartContext();

    return(
        <div className="carrito-container">
            <div className="carrito-items">
                {cart.cart.map((item) => (
                    <ItemCarrito
                        key={item.name}
                        name={item.name}
                        image={item.image}
                        price={item.price}
                        quantity={item.quantity}
                    />
                ))}
            </div>
            <div className="totalAndBuy">
                <h2>Subtotal: {cart.totalPrice}€</h2>
                <Button className="big-button primary-button" text="Finalizar compra" onClick={() => {}}/>
            </div>
        </div>
    )
}

export default Carrito