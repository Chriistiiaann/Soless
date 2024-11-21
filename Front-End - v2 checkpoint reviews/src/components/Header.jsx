import './styles/Module.Header.css';
import logo from '../img/logoSoless.png';
import usuarioIcon from '../img/usuario.png';
import carritoIcon from '../img/carrito.png';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context_providers/AuthProvider';  
import { useState, useEffect } from 'react';

function Header() {
  const { user, isAuthenticated, logout } = useAuth() || {}; 
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && !isAuthenticated) {
      console.log("Usuario sincronizado desde localStorage");
    }
  }, [isAuthenticated]);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

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
          <div className="usuario-icon-container">
            {isAuthenticated ? (
              <div className="user-info">
                <img 
                  src={usuarioIcon} 
                  alt="Usuario" 
                  className="icono" 
                  onClick={toggleUserMenu} 
                />
                {showUserMenu && (
                  <div className="user-menu">
                    <p><strong>Bienvenido, {user?.name}</strong></p>
                    <button onClick={logout}>Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/Login" aria-label="Usuario">
                <img 
                  src={usuarioIcon} 
                  alt="Usuario" 
                  className="icono" 
                />
              </Link>
            )}
          </div>
          <Link to="" aria-label="Carrito">
            <img 
              src={carritoIcon} 
              alt="Carrito" 
              className="icono" 
            />
          </Link>
        </div>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;