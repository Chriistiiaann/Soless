import React, { useState, useEffect } from 'react';

// Importar imágenes
import foto1 from '../img/foto2.jpg';
import foto2 from '../img/foto1.jpg';
import foto3 from '../img/foto3.jpg';
import flechaIzquierda from '../img/flecha-izquierda.jpg';
import flechaDerecha from '../img/flecha-derecha.jpg';
import './Module.Carrusel.css';
/**HACERLO REHUSABLE */
const Carrusel = () => {
  const imagenes = [foto2, foto1,foto3];
  const [indiceActual, setIndiceActual] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const siguienteImagen = () => {
    setIndiceActual((indicePrevio) => (indicePrevio + 1) % imagenes.length);
  };

  const anteriorImagen = () => {
    setIndiceActual((indicePrevio) => (indicePrevio - 1 + imagenes.length) % imagenes.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) siguienteImagen();
    }, 10000); // Cambia la imagen cada 10 segundos

    return () => clearInterval(interval); // Limpieza al desmontar
  }, [isHovered]);

  return (
    <div 
      className="slider-container" 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="boton-carrusel anterior" onClick={anteriorImagen} aria-label="Anterior">
        <img src={flechaIzquierda} alt="Anterior" />
      </button>

      <div className="imagenes">
        {imagenes.map((imagen, index) => (
          <img 
            key={index} 
            src={imagen} 
            alt={`Imagen ${index + 1}`} 
            className={`imagen-carrusel ${index === indiceActual ? 'visible' : ''}`} // Mostrar solo la imagen actual
          />
        ))}
      </div>

      <button className="boton-carrusel siguiente" onClick={siguienteImagen} aria-label="Siguiente">
        <img src={flechaDerecha} alt="Siguiente" />
      </button>
    </div>
  );
};

export default Carrusel;