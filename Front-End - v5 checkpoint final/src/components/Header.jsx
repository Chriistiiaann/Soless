import './styles/Module.Header.css';
import logo from '../img/logoSoless.png';
import usuarioIcon from '../img/usuario.png';
import carritoIcon from '../img/carrito.png';
import NavBar from './NavBar';
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context_providers/AuthProvider';
import { useState, useEffect } from 'react';
import { useCartContext } from '../context_providers/CartProvider';
import { URL_IMAGES } from '../config';

function Header() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth() || {};
  const { cart, totalPrice, inicializarCarrito, numItems,resetearCarrito } = useCartContext();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false); // Estado para el modal del carrito

  const userId = user?.id;

  // Sincroniza el carrito al cambiar el estado de autenticación
  useEffect(() => {
    if (userId) {
      inicializarCarrito(isAuthenticated, userId);
    }
  }, [isAuthenticated, userId]);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleCartHover = (isHovering) => {
    setShowCartModal(isHovering);
  };

  const handleUserHover = (isHovering) => {
    setShowUserMenu(isHovering);
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
          <div
            className="usuario-icon-container"
            onMouseEnter={() => handleUserHover(true)}
            onMouseLeave={() => handleUserHover(false)}
          >
            {isAuthenticated ? (
              <div className="user-info">
                <img
                  src={usuarioIcon}
                  alt="Usuario"
                  className="icono"
                  onClick={toggleUserMenu}
                />
                {showUserMenu && (
                  <div className="user-modal">
                    <h3>Bienvenido, {user?.name}</h3>
                    <ul>
                      <li><Link to="/perfil">Ver Perfil</Link></li>
                      <li><Link to="/pedidos">Mis Pedidos</Link></li>
                      {user?.role === "admin" && <li><Link to="/Admin">Dashboard</Link></li>}
                      <li>
                        <button className="logout-button" onClick={() => {resetearCarrito();logout(); navigate("/login"); }}>
                          Cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/Login" aria-label="Usuario">
                <img src={usuarioIcon} alt="Usuario" className="icono" />
              </Link>
            )}
          </div>

          {/* Ícono del carrito */}
          <div
            className="carrito-icon-container"
            onMouseEnter={() => handleCartHover(true)}
            onMouseLeave={() => handleCartHover(false)}
          >
            <img src={carritoIcon} alt="Carrito" className="icono" />
            {numItems > 0 && (
              <div className="items-counter">
                {numItems}
              </div>
            )}
            {showCartModal && (
              <div className="cart-modal">
                <h3>Tu Carrito</h3>
                {cart.length === 0 ? (
                  <p>Carrito vacío</p>
                ) : (
                  <ul className="cart-items">
                    {cart.map((item) => (
                      <li key={item.productId}>
                        <div className="cart-item">
                          <img
                            className="cart-item-image-modal"
                            src={URL_IMAGES + item.productImage}
                            alt={item.productName}
                          />
                          <h4>{item.productName}</h4>
                          <p>Ud. {item.productPrice}€</p>
                          <p>Total: {item.totalPriceObject}€</p>
                          <p>Cantidad: {item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="cart-total">
                  <p>Total: {totalPrice}€</p>
                  <Link to="/Carrito" className="checkout-button">
                    Ir al carrito
                  </Link>
                </div>
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
