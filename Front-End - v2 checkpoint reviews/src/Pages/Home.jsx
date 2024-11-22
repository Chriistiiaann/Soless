import BarraBusqueda from '../components/Barra-busqueda.jsx'
import Section from "../components/Section.jsx";
import ImageSlider from "../components/ImageSlider.jsx";

import { ofertas, productos, proximamente, images } from "../data/data.js";

import { useCartContext } from '../context_providers/CartProvider.jsx';
import { itemsCarrito } from "../data/data"


function Home() {

    const cart = useCartContext();
    cart.setCart(itemsCarrito);
    console.log("Items en carrito:",cart.cart);

    return(
        <>
            <ImageSlider images={images}/>
            <BarraBusqueda/>
            <Section title="Productos" offer={false}>{productos}</Section>
            <Section title="Ofertas" offer={true}>{ofertas}</Section>
            <Section title="Proximamente" offer={false}>{proximamente}</Section>
        </>
    )
}
export default Home;