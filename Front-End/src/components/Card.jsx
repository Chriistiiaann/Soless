import PropTypes from 'prop-types'
import "./styles/Module.Card.css"

function Card({key,image, name, reviews, reviewsImg, stock, originalPrice, discountPrice, offer}) {

    if (offer == true) {
        return (
            <div className="card-offer" id={key}>
                <div className='img-container'>
                    <img className="img" src={image} />
                </div>
                <hr/>
                <div className="product-info">
                    <h3>{name}</h3>
                    <div className="reviews">
                        <p>{reviews}</p> 
                        <p>{reviewsImg}</p>
                    </div>
                    
                </div>
                <div className="product-info">
                    <p>{stock}</p>
                    <span>
                        <span className="old-price">{originalPrice}€</span>
                        <span className="new-price">{discountPrice}€</span>
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="card" id={key}>
                <div className='img-container'>
                    <img className="img" src={image} />
                </div>
                <hr/>
                <div className="product-info">
                    <h3>{name}</h3>
                    <div className="reviews">
                        <p>{reviews}</p> 
                        <p>{reviewsImg}</p>
                    </div>
                </div>
                <div className="product-info">
                    <p>{stock}</p>
                    <p>{originalPrice}€</p>
                </div>
            </div>
        );
    }
    
}

Card.propTypes = {
    key: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    reviews: PropTypes.number,
    reviewsImg: PropTypes.string,
    stock: PropTypes.string,
    originalPrice: PropTypes.number,
    discountPrice: PropTypes.number,
    offer: PropTypes.boolean
}

export default Card

