import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCartContext } from "../context_providers/CartProvider";
import { useAuth } from "../context_providers/AuthProvider";
import { URL_IMAGES, GET_SHOE_BY_ID_ENDPOINT } from "../config";
import "./styles/Module.ProductDetails.css";
import ProductQuantity from "../components/ProductQuantity";
import ShoeSizeSelector from "../components/ShoeSizeSelector";
import ProductReviews from "../components/ProductReviews";


function ProductDetails() {
    let { id } = useParams();
    const { addProductToCart, addProductToCartNoUser } = useCartContext();
    const [shoeDetails, setShoeDetails] = useState(null);
    const [counter, setCounter] = useState(1);

    const { user } = useAuth(); 

    id = Number(id);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`${GET_SHOE_BY_ID_ENDPOINT}${id}`);
                const data = await response.json();
                setShoeDetails(data);
                console.log(data);
            } catch (error) {
                console.error("Error al cargar los datos del producto:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const addItem = () => {
        if (!user) {
            addProductToCartNoUser(id, counter);
            return;
        }

        addProductToCart(user.id, Number(id), counter)
            .then(data => {
                console.log("Producto añadido:", data);
            })
            .catch(error => {
                console.error("Ocurrió un problema al añadir el producto:", error);
            });
    };

    if (!shoeDetails) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="containerDetails">
            <div className="imageDetails">
                <img
                    src={`${URL_IMAGES}${shoeDetails.img_Name}`}
                    alt={shoeDetails.model}
                />
            </div>
            <div className="product">
                <p className="brand">{shoeDetails.brand}</p>
                <h1>{shoeDetails.model}</h1>
                <h2>{`${shoeDetails.original_Price} €`}</h2>
                <h3>{`Stock: ${shoeDetails.stock}`}</h3>
                <p className="description">{shoeDetails.description}</p>
                <p className="composition">
                    <b>Composición:</b><br />
                    {shoeDetails.composition}
                </p>
                <div className="buttons">
                    <div className="quantity-container">
                        <ShoeSizeSelector />
                        <ProductQuantity
                            counter={counter}
                            setCounter={setCounter}
                        />
                    </div>
                    <button className="big-button primary-button add" onClick={addItem}>Añadir al carrito</button>
                </div>
            </div>
            
            <ProductReviews productId={id} user={user} />
            
        </div>
    );
}

export default ProductDetails;
