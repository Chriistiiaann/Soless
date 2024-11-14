import "./Module.Card.css"
import img1 from "../img/zapatillas bajas SB Dunk de Nike x Travis Scott 01.webp"
import img2 from "../img/zapatillas Air Force 1 de Nike x Louis Vuitton 01.webp"
import img3 from "../img/zapatillas Air Max 1-97 VF de Nike x Sean Wotherspoon 01.webp"
import img4 from "../img/zapatillas SB Dunk Low de Nike x Grateful Dead 01.jpg"

function CartProducto (){
    return(
        <>

            <div className="encabezadoCard">
                <h2>Productos</h2>
                <a href="#">Ver mas...</a>
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
                        <p>2850€</p>
                    </div>
                </div>
                <div className="card">
                    <img className="imagen" src={img2}/>
                    <hr className="lineaProducto"/>
                    <div className="data">
                        <h3>AF1 LV</h3>
                        <p>9 🙂</p>
                    </div>
                    <div className="data">
                        <p>Stock</p>
                        <p>13785€</p>
                    </div>
                </div>
                <div className="card">
                    <img className="imagen" src={img3}/>
                    <hr className="lineaProducto"/>
                    <div className="data">
                        <h3>Air Max 1/97</h3>
                        <p>9 🙂</p>
                    </div>
                    <div className="data">
                        <p>Stock</p>
                        <p>2205€</p>
                    </div>
                </div>
                <div className="card">
                    <img className="imagen" src={img4}/>
                    <hr className="lineaProducto"/>
                    <div className="data">
                        <h3>Dunk Low SB</h3>
                        <p>9 🙂</p>
                    </div>
                    <div className="data">
                        <p>Stock</p>
                        <p>1175€</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default CartProducto;