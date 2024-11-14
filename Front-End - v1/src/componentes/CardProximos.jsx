import "./Module.Card.css"
import img1 from "../img/zapatillas altas Converse x Off-White Chuck 70.webp"
import img2 from "../img/zapatillas Chuck 70 Hi de Converse x Isabel Marant.webp"
import img3 from "../img/zapatillas Air Max 1-97 VF de Nike x Sean Wotherspoon 01.webp"
import img4 from "../img/zapatillas Run Star Motion WhiteBlackGum.jpg"

function CartProximos (){
    return(
        <>

            <div className="encabezadoCard">
                <h2>Proximos</h2>
            </div>
            <hr/>
            <div className="cards">
                <div className="card">
                    <img className="imagen" src={img1}/>
                    <hr className="lineaProducto"/>
                    <div className="data">
                        <h3>Dunk Travis</h3>
                        <p>9 🙂</p>
                    </div>
                    <div className="data">
                        <p>Stock</p>
                        <p>1850€</p>
                    </div>
                </div>
                <div className="card">
                    <img className="imagen" src={img2}/>
                    <hr className="lineaProducto"/>
                    <div className="data">
                        <h3>Dunk Travis</h3>
                        <p>9 🙂</p>
                    </div>
                    <div className="data">
                        <p>Stock</p>
                        <p>1850€</p>
                    </div>
                </div>
                <div className="card">
                    <img className="imagen" src={img3}/>
                    <hr className="lineaProducto"/>
                    <div className="data">
                        <h3>Dunk Travis</h3>
                        <p>9 🙂</p>
                    </div>
                    <div className="data">
                        <p>Stock</p>
                        <p>1850€</p>
                    </div>
                </div>
                <div className="card">
                    <img className="imagen" src={img4}/>
                    <hr className="lineaProducto"/>
                    <div className="data">
                        <h3>Dunk Travis</h3>
                        <p>9 🙂</p>
                    </div>
                    <div className="data">
                        <p>Stock</p>
                        <p>1850€</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartProximos;