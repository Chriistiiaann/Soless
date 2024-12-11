import PropTypes from 'prop-types'
import "./styles/Module.Card.css"
import { URL_IMAGES } from '../config'
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { GET_REVIEW_ENDPOINT } from "../config";


function Card({id, brand, discount_Price, original_Price, img_Name, model, stock, offer}) {

    const img_URL = URL_IMAGES + img_Name

    const [reviewCount, setReviewCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await fetch(GET_REVIEW_ENDPOINT + id);
                if (!response.ok) {
                    throw new Error(`Error fetching reviews for product ${id}`);
                }
                const reviews = await response.json();
                setReviewCount(reviews.length);
            } catch (error) {
                console.error(error);
                setReviewCount(0);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [id]);

    if (offer) {
        return (
            <Link to={`/Catalogo/${id}`} className='link'>
            <div className="card-offer" id={id}>
                <div className='img-container'>
                    <img className="img-offer" src={img_URL} />
                </div>
                <hr/>
                <div className="product-info">
                    <div className='product-info-top'>
                        <div className='naming'>
                            <h3>{brand}</h3>
                            <p>{model}</p>
                        </div>
                        <div className="reviews">
                            <p>{loading ? "Cargando..." : reviewCount}</p> 
                            <p>🙂</p>
                        </div>
                    </div>
                    <div className='product-info-bottom'>
                        <p>{stock}</p>
                        <span>
                            <span className="old-price">{original_Price}€</span>
                            <span className="new-price">{discount_Price}€</span>
                        </span>
                    </div>
                </div>
                
            </div>
            </Link>
        );
    } else {
        return (
            <Link to={`/Catalogo/${id}`} className='link'>
            <div className="card" id={id}>
                <div className='img-container'>
                    <img className="img" src={img_URL} />
                </div>
                <hr/>
                <div className="product-info">
                    <div className='product-info-top'>
                        <div className='naming'>
                            <h3>{brand}</h3>
                            <p>{model}</p>
                        </div>
                        <div className="reviews">
                            <p>{loading ? "Cargando..." : reviewCount}</p> 
                            <p>🙂</p>
                        </div>
                    </div>
                    <div className='product-info-bottom'>
                        <p>{stock}</p>
                        <p>{original_Price}€</p>
                    </div>
                </div>
                
            </div>
            </Link>
        );
    }
    
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    brand: PropTypes.string.isRequired,
    discount_Price: PropTypes.number.isRequired,
    original_Price: PropTypes.number.isRequired,
    img_Name: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    stock: PropTypes.number.isRequired,
    offer: PropTypes.bool
}

export default Card

