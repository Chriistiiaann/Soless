import './styles/Module.Header.css';
import logo from '../img/logoSoless.png';
import usuarioIcon from '../img/usuario.png';
import carritoIcon from '../img/carrito.png';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context_providers/AuthProvider';
import { useState, useEffect } from 'react';

import { useCartContext } from '../context_providers/CartProvider';

function Header() {
  const { user, isAuthenticated, logout } = useAuth() || {};
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false); // Estado para el modal del carrito

  const cart = useCartContext();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && !isAuthenticated) {
      console.log("Usuario sincronizado desde localStorage");
    }
  }, [isAuthenticated]);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleCartHover = (isHovering) => {
    setShowCartModal(isHovering);
  };

  return (
    <header className="header">
      <div className="barra">
        <div className="logo-container">
          <img src={logo} alt="Logo Soless" className="logo" />
        </div>
        <Link to="/" className="titulo-link">
          <h1 className="titulo">SOLESS</h1>
        </Link>
        <div className="iconos">
          {/* Ícono de usuario */}
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
                    <p>
                      <strong>Bienvenido, {user?.name}</strong>
                    </p>
                    <button onClick={logout}>Cerrar sesión</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/Login" aria-label="Usuario">
                <img src={usuarioIcon} alt="Usuario" className="icono" />
              </Link>
            )}
          </div>

          <div
            className="carrito-icon-container"
            onMouseEnter={() => handleCartHover(true)}
            onMouseLeave={() => handleCartHover(false)}
          >
            <img src={carritoIcon} alt="Carrito" className="icono" />
            {showCartModal && (
              <div className="cart-modal">
                <h3>Tu Carrito</h3>

                <ul className="cart-items">
                  {cart.cart.map((item) => (
                    <li key={item.name}>
                      <div className="cart-item">
                        <img className="cart-item-image-modal" src={item.image} alt={item.name} />
                        <h4>{item.name}</h4>
                        <p>{item.price}€</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p style={{ cursor: 'pointer', color: 'red' }}>X</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <p>Total: {cart.totalPrice}€</p>
                <Link to="/Carrito" className="checkout-button">
                  Ir al carrito
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <NavBar />
    </header>
  );
}

export default Header;
