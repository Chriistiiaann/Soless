import {useState} from 'react'
import propTypes from 'prop-types'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

function ImageSlider({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0)


    const sliderContainerStyles = {
        height: '100vh',
        width: '95vw',
        position: 'relative',
        margin: '5vh auto',
    };

    const slideStyles = {
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: `url(${images[currentIndex]})`,
        borderRadius: '10px',
    };

    const leftArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        left: '0px',
        fontSize: '25px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
    };

    const rightArrowStyles = {
        position: 'absolute',
        top: '50%',
        transform: 'translate(0, -50%)',
        right: '0px',
        fontSize: '25px',
        color: '#fff',
        zIndex: 1,
        cursor: 'pointer',
        background: 'none',
        border: 'none',
    };


    const nextSlide = () => {
        setCurrentIndex((currentIndex + 1) % images.length)
    };
    
    const prevSlide = () => {
        setCurrentIndex((currentIndex - 1 + images.length) % images.length)
    };

    return (
        <div style={sliderContainerStyles}>
            <div style={slideStyles}></div>
            <button onClick={prevSlide} style={leftArrowStyles}><FaArrowLeft /></button>
            <button onClick={nextSlide} style={rightArrowStyles}><FaArrowRight /></button>
        </div>
    );
}

ImageSlider.propTypes = {
    images: propTypes.array
}

export default ImageSlider