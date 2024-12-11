
import Section from "../components/Section.jsx";
import ImageSlider from "../components/ImageSlider.jsx";
import { useEffect } from "react";
import { GET_SHOES_ENDPOINT } from "../config";
import { images } from "../data/data.js";
import { useShoesContext } from "../context_providers/ShoesProvider";

function Home() {

    const shoes = useShoesContext();

    async function connectToApi(url, data) {
        console.log("Datos enviados al backend", data);
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const datosPromesa = await response.json();
                console.log("Datos recibidos del backend", datosPromesa);

                shoes.setShoes(datosPromesa.items);

            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); 
    }
    const randomNum = getRandomIntInclusive(1, 3);

    useEffect(() => {
        const objetoBackend = {
            "query": "",
            "sortField": "",
            "sortOrder": "filter.sortOrder",
            "page": randomNum,
            "limit": 10
        };
        connectToApi(GET_SHOES_ENDPOINT, objetoBackend);
    }, []);

    console.log(shoes);

    const productos = shoes.shoes.slice(0, 4)
    const ofertas = shoes.shoes.slice(4, 8)
    const proximamente = shoes.shoes.slice(4, 8) 

    return(
        <div className="home-container">
            <ImageSlider images={images}/>
            <Section title="Productos" offer={false}>{productos}</Section>
            <Section title="Ofertas" offer={true}>{ofertas}</Section>
            <Section title="Proximamente" offer={false}>{proximamente}</Section>
        </div>
    )
}
export default Home;
