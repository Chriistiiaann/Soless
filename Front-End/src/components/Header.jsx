import './styles/Module.Header.css'
import logo from '../img/logoSoless.png';
import usuarioIcon from '../img/usuario.png';
import carritoIcon from '../img/carrito.png';
import NavBar from './NavBar';


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
        <a href="#Inicio" className="titulo-link">
          <h1 className="titulo">SOLESS</h1>
        </a>
        <div className="iconos">
          <a href="/Login" aria-label="Usuario">
            <img 
              src={usuarioIcon} 
              alt="Usuario" 
              className="icono" 
            />
          </a>
          <a href="#Carrito" aria-label="Carrito">
            <img 
              src={carritoIcon} 
              alt="Carrito" 
              className="icono" 
            />
          </a>
        </div>
      </div>
      {<NavBar />}
    </header>
  );
}

export default Header;