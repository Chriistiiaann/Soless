import { Link } from "react-router-dom"
import "./styles/Module.NavBar.css"
function NavBar() {

    return (
        <>
            <nav className="nav">
                <Link to="/Catalogo">Productos</Link>
                <a href="#Proximamente">Próximamente...</a>
                <Link to="/AboutUs">Sobre Nosotros</Link>
                <a href="#Contacto">Contacto</a>
            </nav>
        </>
    )
}
    
export default NavBar