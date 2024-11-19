import PropTypes from 'prop-types'
import { useAuth } from "../context_providers/AuthProvider";  



function Review({content, rating, userName, date}){
  const {isAuthenticated} = useAuth() || {}; 

  <div className="containerReviews">
    <h2>Reviews</h2>
    <hr/>
    <div className="info">
      <div className="reviewHeader">
        {/* <p className="username">{userName}</p> */}
        <p className="rating">{rating}</p>
        <p className="date">{date}</p>
      </div>
      <p className="content">{content}</p>
      {isAuthenticated ?
        <form>
          <h1>Content</h1>
          <input
            id="content"
            name="content"
            type="text"
            placeholder="Content"
            required
            ref={emailRef}
          />
          <h1>Rating</h1>
          <input
            id="rating"
            name="rating"
            type="text"
            placeholder="Rating 1-5"
            required
            ref={emailRef}
          />
        </form> :
        <Link to={`/Login`}>
          <div>Inicia Sesión para Escribir una Reseña</div>
        </Link>
      }
      
    </div>
  </div>
}

Review.propTypes = {
  content: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  // userName: PropTypes.strng.isRequired,
} 

export default Review