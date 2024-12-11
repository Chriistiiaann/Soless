import './styles/Module.Footer.css'
import { FaInstagram, FaYoutube, FaTiktok, FaTwitter } from 'react-icons/fa';


function Footer () {
    return (
        <>
            <footer>
                <div className="left">
                    <div className="logo">
                        SOLESS
                    </div>
                </div>
            
                <div className="center">
                    <div className="apartado">
                        <div className="section-title">
                            <p>Sobre nosotros</p>
                        </div>
                        <div className="desarrollo">
                            <p>Trabaja con nosotros</p><br/>
                            <p>Nosotros</p><br/>
                            <p>Sostenibilidad</p><br/>
                            <p>Proposito</p>
                        </div>
                    </div>
                    <div className="apartado">
                        <div className="section-title">
                            <p>Ayuda</p>
                        </div>
                        <div className="desarrollo">
                            <p>Obtener ayuda</p><br/>
                            <p>Estado del pedido</p><br/>
                            <p>Envio y entrega</p><br/>
                            <p>Devoluciones</p>
                        </div>
                    </div>
                    <div className="apartado">
                        <div className="section-title">
                            <p>Información</p>
                        </div>
                        <div className="desarrollo">
                            <p>Aviso legal</p><br/>
                            <p>Politica de privacidad</p><br/>
                            <p>Terminos</p><br/>
                            <p>Pólitica de cookies</p>
                        </div>
                    </div>
                </div>
                <div className="right">
                        <div>
                            <p>Síguenos en:</p>
                        </div>
                        <div className="icons">
                            <FaInstagram className="icon" />
                            <FaYoutube className="icon" />
                            <FaTiktok className="icon" />
                            <FaTwitter className="icon" />
                        </div>
                    
                    </div>
            </footer>
        </>
    )
}
export default Footer;