import Footer from "../components/Footer";
import Header from '../components/Header.jsx'
import BarraBusqueda from '../components/Barra-busqueda.jsx'
import Section from "../components/Section.jsx";
import ImageSlider from "../components/ImageSlider.jsx";
import { ofertas, productos, proximamente, images } from "../data/data.js";

function Home() {
    return(
        <>
            <Header/>
            <ImageSlider images={images}/>
            <BarraBusqueda/>
            <Section title="Productos" offer={false}>{productos}</Section>
            <Section title="Ofertas" offer={true}>{ofertas}</Section>
            <Section title="Proximamente" offer={false}>{proximamente}</Section>
            <Footer/>
        </>
    )
}
export default Home;