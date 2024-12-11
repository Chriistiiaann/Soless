import PropTypes from 'prop-types'
import "./styles/Module.Card-developers.css"

function Card({image, name, description}) {

        return (
            <div className="card-developer">
                <div className='img-container-developer'>
                    <img className="img-developer" src={image} alt="photo"/>
                </div>
                <div className="developer-info">
                    <h3>{name}</h3>
                    <p className="developer-description">{description}</p>
                </div>
            </div>
        )
}

Card.propTypes = {
    image: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string
}

export default Card

