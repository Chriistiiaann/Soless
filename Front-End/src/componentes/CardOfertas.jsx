import "./Module.Card.css"
import img1 from "../img/zapatillas altas Converse x Off-White Chuck 70.webp"
import img2 from "../img/zapatillas Chuck 70 Hi de Converse x Isabel Marant.webp"
import img4 from "../img/zapatillas Run Star Motion WhiteBlackGum.jpg"

function CardOfertas (){
    return(
        <>
            <div className="ofertas">
                <div className="encabezadoCard">
                    <h2>Ofertas</h2>
                </div>
                <hr/>
                <div className="cards">
                    <div className="cardoferta">
                        <img className="imagen" src={img1}/>
                        <hr className="lineaProducto"/>
                        <div className="data">
                            <h3>Converse x Off-White</h3>
                            <p>9 🙂</p>
                        </div>
                        <div className="data">
                            <p>Stock</p>
                            <p><span className="descuento">2570€</span>2225€</p>
                        </div>
                    </div>
                    <div className="cardoferta">
                        <img className="imagen" src={img2}/>
                        <hr className="lineaProducto"/>
                        <div className="data">
                            <h3>Chuck 70 Hi Converse</h3>
                            <p>9 🙂</p>
                        </div>
                        <div className="data">
                            <p>Stock</p>
                            <p><span className="descuento">152€</span>120€</p>
                        </div>
                    </div>
                    <div className="cardoferta">
                        <img className="imagen" src={img4}/>
                        <hr className="lineaProducto"/>
                        <div className="data">
                            <h3>Run Star Motion</h3>
                            <p>9 🙂</p>
                        </div>
                        <div className="data">
                            <p>Stock</p>
                            <p><span className="descuento">168€</span>143€</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CardOfertas;