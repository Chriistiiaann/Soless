import "./styles/Module.ItemCarrito.css";
import { URL_IMAGES } from "../config";

function ItemCheckOut({ productId, productName, productImage, productPrice, totalPriceObject, quantity }) {
    return (
        <>
        <div className="itemCarrito" id={productId}>
            <img className="cartItemImage" src={URL_IMAGES + productImage} alt="Imagen del producto" />
            <div className="productInfo">
                <h3 className="productName">{productName}</h3>
                <p className="productPrice">Precio unitario: {productPrice}€</p>
                <p className="productTotal">Total: {totalPriceObject}€</p>
                <p>Cantidad: {quantity}</p>
            </div>
        </div>
        </> 
    );
}
export default ItemCheckOut;
