import Footer from "../components/Footer";
import Header from "../components/Header.jsx";
import PropTypes from "prop-types";
import Card from "../components/Card-developers.jsx";
import { developers, inf_pagAboutUs, valores } from "../data/data.js";
import "./styles/Module.AboutUS.css";


function AboutUs (){

    return(
    <>
        <Header />
        <div className="about-us-content">
            <div className="about-us-description">
                <p>{inf_pagAboutUs.description}</p>
            </div>
            <div className="title_developers">
                <h2>{inf_pagAboutUs.title}</h2>
                <img src={inf_pagAboutUs.img_logo} alt="Logo" className="logo"/>
            </div>
            <div className="list-developers">
                {developers.map((dev, index) => (
                    <Card key={index} image={dev.image} name={dev.name} description={dev.description} /> // Renderiza cada desarrollador en un Card
                ))}
            </div>
            <div className="mv">
                <div className="mision">
                    <h2>Misión</h2>
                    <p>{inf_pagAboutUs.mision}</p>
                </div>
                <div className="vision">
                    <h2>Visión</h2>
                    <p>{inf_pagAboutUs.vision}</p>
                </div>
            </div>
            <div className="valores">
                <h2>Valores</h2>
                <div className="valor-item">
                    <h3>Autenticidad</h3>
                    <p>{valores.Autenticidad}</p>
                </div>
                <div className="valor-item">
                    <h3>Creatividad</h3>
                    <p>{valores.Creatividad}</p>
                </div>
                <div className="valor-item">
                    <h3>Innovación</h3>
                    <p>{valores.Innovación}</p>
                </div>
                <div className="valor-item">
                    <h3>Colaboración</h3>
                    <p>{valores.Colaboración}</p>
                </div>
                <div className="valor-item">
                    <h3>Calidad</h3>
                    <p>{valores.Calidad}</p>
                </div>
                <div className="valor-item">
                    <h3>Inclusión</h3>
                    <p>{valores.Inclusión}</p>
                </div>
            </div>
        </div>
        <Footer />
    </>
    )
}

AboutUs.prototype = {
    description: PropTypes.string,
    image_logo: PropTypes.string
}

export default AboutUs;