import './styles/Module.Header.css'
import logo from '../img/logoSoless.png';
import usuarioIcon from '../img/usuario.png';
import carritoIcon from '../img/carrito.png';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
        
      <div className="barra">
        <div className="logo-container">
          <img 
            src={logo} 
            alt="Logo Soless" 
            className="logo" 
          />
        </div>
        <Link to="/" className="titulo-link">
          <h1 className="titulo">SOLESS</h1>
        </Link>
        <div className="iconos">
          <Link to="/Login" aria-label="Usuario">
            <img 
              src={usuarioIcon} 
              alt="Usuario" 
              className="icono" 
            />
          </Link>
          <Link to="" aria-label="Carrito">
            <img 
              src={carritoIcon} 
              alt="Carrito" 
              className="icono" 
            />
          </Link>
        </div>
      </div>
      {<NavBar />}
    </header>
  );
}

export default Header;