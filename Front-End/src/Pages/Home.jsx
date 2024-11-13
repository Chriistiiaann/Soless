import Footer from "../componentes/Footer";
import CardProducto from "../componentes/CardProductos"
import CardProximos from "../componentes/CardProximos"
import CardOfertas from "../componentes/CardOfertas"
import Header from '../componentes/Header.jsx'
import BarraBusqueda from '../componentes/Barra-busqueda.jsx'
import Carrusel from '../componentes/Carrusel.jsx'

function Home() {
    return(
        <>
            <Header/>
            <Carrusel/>
            <BarraBusqueda/>
            <CardProducto />
            <CardOfertas />
            <CardProximos />
            <Footer/>
        </>
    )
}
export default Home;