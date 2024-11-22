import ProductQuantity from "./ProductQuantity"
import ShoeSizeSelector from "./ShoeSizeSelector"
import Button from "./Button"
import PropTypes from "prop-types"
import "./styles/Module.ItemCarrito.css"

function ItemCarrito({name, image, price, totalPerItem, quantity, totalPrice}) {

    return (
        <div className="itemCarrito">
            <img className="cartItemImage" src={image} alt="product image" />
            <div className="productInfo">
                <div className="top-div">
                    <h3 className="productName">{name}</h3>
                    <div className="price-container">
                        <p className="productPrice">Ud. {price}€</p>
                        <p className="productTotal">Total: XXX€</p>
                    </div>
                </div>
                <div className="bottom-div">
                    <ProductQuantity initialValue={quantity}/>
                    <ShoeSizeSelector />
                    <Button className="big-button" text="Comprar Ya" onClick={() => {}}/>
                </div>
            </div>
            
        </div>
    )

}

ItemCarrito.propTypes = {
    name: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    totalPerItem: PropTypes.number,
    totalPrice: PropTypes.number
}

export default ItemCarrito