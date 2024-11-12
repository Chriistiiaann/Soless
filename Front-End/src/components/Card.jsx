import PropTypes from 'prop-types'
import "./styles/Module.Card.css"
import { URL_IMAGES } from '../config'

function Card({id, brand, discount_Price, original_Price, img_Name, model, stock, offer}) {

    const img_URL = URL_IMAGES + img_Name

    if (offer) {
        return (
            <div className="card-offer" id={id}>
                <div className='img-container'>
                    <img className="img" src={img_URL} />
                </div>
                <hr/>
                <div className="product-info">
                    <div className='naming'>
                        <h3>{brand}</h3>
                        <p>{model}</p>
                    </div>
                    <div className="reviews">
                        <p>12</p> 
                        <p>🙂</p>
                    </div>
                    
                </div>
                <div className="product-info">
                    <p>{stock}</p>
                    <span>
                        <span className="old-price">{original_Price}€</span>
                        <span className="new-price">{discount_Price}€</span>
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div className="card" id={id}>
                <div className='img-container'>
                    <img className="img" src={img_URL} />
                </div>
                <hr/>
                <div className="product-info">
                    <div className='naming'>
                        <h3>{brand}</h3>
                        <p>{model}</p>
                    </div>
                    <div className="reviews">
                        <p>12</p> 
                        <p>🙂</p>
                    </div>
                </div>
                <div className="product-info">
                    <p>{stock}</p>
                    <p>{original_Price}€</p>
                </div>
            </div>
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

