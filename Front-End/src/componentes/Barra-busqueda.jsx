import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Module.Barra-busqueda.css';

const BarraBusqueda = () => {
  const [busqueda, setBusqueda] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault();
    console.log(busqueda); // Manejo de la búsqueda
  };

  return (
    <form onSubmit={manejarEnvio} className="barra-busqueda">
      <input
        type="text"
        placeholder="Buscar..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="input-busqueda"
      />
      <button type="submit" className="boton-busqueda">
        <FaSearch />
      </button>
    </form>
  );
};

export default BarraBusqueda;