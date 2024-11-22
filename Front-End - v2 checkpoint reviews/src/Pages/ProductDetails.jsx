import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { URL_IMAGES } from "../config";
import "./styles/Module.ProductDetails.css";
import ProductQuantity from "../components/ProductQuantity";
import ShoeSizeSelector from "../components/ShoeSizeSelector";

function ProductDetails() {
    const { id } = useParams(); 
    const [shoeDetails, setShoeDetails] = useState(null); 
    const [reviews, setReviews] = useState([]); 
    const [loadingReviews, setLoadingReviews] = useState(true); 
    const [reviewsError, setReviewsError] = useState(null); 
    const [hasPurchased, setHasPurchased] = useState(false); 
    const [hasReviewed, setHasReviewed] = useState(false);
    const [reviewContent, setReviewContent] = useState(""); 
    const [rating, setRating] = useState(0); 
    const [formSubmitted, setFormSubmitted] = useState(false); 

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://localhost:7200/api/Product/id?id=${id}`);
                const data = await response.json();
                setShoeDetails(data);
            } catch (error) {
                console.error("Error al cargar los datos del producto:", error);
            }
        };

        fetchProduct();
    }, [id]); 

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch(`https://localhost:7200/api/Review/Product/${id}`);
                if (!response.ok) {
                    throw new Error("Error al cargar las reseñas.");
                }
                const data = await response.json();
                setReviews(data);

                if (user) {
                    const userHasReviewed = data.some(review => review.userId === user.id);
                    setHasReviewed(userHasReviewed);
                }
            } catch (error) {
                setReviewsError(error.message);
            } finally {
                setLoadingReviews(false); 
            }
        };

        const fetchPurchasedProducts = async () => {
            if (!user) return; 

            try {
                const response = await fetch(`https://localhost:7200/api/Orders/user/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    const productPurchased = data.some(order =>
                        order.orderItems.some(item => item.productId.toString() === id)
                    );
                    setHasPurchased(productPurchased);
                }
            } catch (error) {
                console.error("Error al obtener los productos comprados:", error);
            }
        };

        fetchReviews();
        fetchPurchasedProducts();
    }, [id, user]); 

    const handleReviewSubmit = async e => {
        e.preventDefault();

        if (!reviewContent || rating === 0) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!user) {
            alert("No se encontró información del usuario. Inicia sesión nuevamente.");
            return;
        }

        const newReview = {
            productId: parseInt(id),
            userId: user.id,
            userName: user.name,
            content: reviewContent,
            rating: rating,
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await fetch("https://localhost:7200/api/Review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newReview),
            });

            if (response.ok) {
                alert("Reseña enviada exitosamente.");
                setFormSubmitted(true);
                setHasReviewed(true); 
                setReviews(prevReviews => [...prevReviews, newReview]);
            } else {
                const errorData = await response.json();
                console.error("Error del servidor:", errorData);
            }
        } catch (error) {
            console.error("Error al enviar la reseña:", error);
        }
    };

    async function handleAddToCart() {
        console.log("Añadir al carrito");
        try {
          const response = await fetch("https://localhost:7200/api/++++++++++++++", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(id),
          });

          if (response.ok) {
              console.log("Producto agregado al carrito");
          } else {
              const errorData = await response.json();
              console.error("Error del servidor:", errorData);
          }
      } catch (error) {
          console.error("Error al añadir el producto:", error);
      }

    }

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
            <p>{shoeDetails.brand}</p>
            <h1>{shoeDetails.model}</h1>
            <h2>{`${shoeDetails.original_Price} €`}</h2>
            <h3>{`Stock: ${shoeDetails.stock}`}</h3>
            <p className="description">{shoeDetails.description}</p>
            <p className="composition">
              <b>Composición:</b><br />
              {shoeDetails.composition}
            </p>
            <div className="buttons">
              <ShoeSizeSelector />
              <ProductQuantity initialValue={1}/>
              <button className="big-button primary-button add" onClick={handleAddToCart}>Añadir al carrito</button>
            </div>
          </div>
      
          <div className="reviews-section">
            <h2>Reseñas</h2>
      
            {/* Sección para añadir una reseña (si es posible) */}
            {user && hasPurchased && !formSubmitted && !hasReviewed && (
              <div className="add-review">
                <h3>Escribe una reseña</h3>
                <form onSubmit={handleReviewSubmit}>
                  <div>
                    <label>Calificación: </label>
                    <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                      <option value={0}>Seleccione una calificación...</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                    </select>
                  </div>
                  <div>
                    <label>Comentario: </label>
                    <textarea
                      value={reviewContent}
                      onChange={e => setReviewContent(e.target.value)}
                      rows="4"
                      cols="50"
                    />
                  </div>
                  <button type="submit">Enviar Reseña</button>
                </form>
              </div>
            )}
      
            {hasReviewed && (
              <p>Ya has enviado una reseña para este producto. ¡Gracias por tu opinión!</p>
            )}

            {!hasPurchased && (
                <p>Para poner una reseña, primero debes adquirir el producto</p>
            )}
      
            {loadingReviews ? (
              <p>Cargando reseñas...</p>
            ) : reviews.length > 0 ? (
              <div className="reviews-list">
                {reviews.map((review, index) => (
                  <div key={index} className="review">
                    <p><strong>Usuario:</strong> {review.userName}</p>
                    <p><strong>Fecha:</strong> {new Date(review.createdAt).toLocaleDateString()}</p>
                    <p><strong>Rating:</strong> ⭐ {review.rating}</p>
                    <p><strong>Comentario:</strong> {review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No hay reseñas disponibles para este producto.</p>
            )}
          </div>
        </div>
      );
}

export default ProductDetails;
