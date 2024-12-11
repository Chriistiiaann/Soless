import { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/Module.NavBar.css";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <nav className="nav">
                <button className="hamburger" onClick={toggleMenu}>
                    ☰
                </button>
                <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                    <Link to="/Catalogo">Productos</Link>
                    <Link to="/Proximamente">Proximamente</Link>
                    <Link to="/AboutUs">Sobre Nosotros</Link>
                    <Link to="/Contacto">Contacto</Link>
                </div>
            </nav>
        </>
    );
}

export default NavBar;
