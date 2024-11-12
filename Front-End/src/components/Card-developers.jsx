import PropTypes from 'prop-types'
import "./styles/Module.Card-developers.css"

function Card({image, name, description}) {

        return (
            <div className="card-developer">
                <div className='img-container'>
                    <img className="img" src={image} alt="photo"/>
                </div>
                <div className="developer-info">
                    <h3>{name}</h3>
                    <p className="description">{description}</p>
                </div>
            </div>
        )
}

Card.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string
}

export default Card

