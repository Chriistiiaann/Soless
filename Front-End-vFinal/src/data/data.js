//Image Slides Carousel

import slide2 from '../img/slider1.jpg';
import slide1 from '../img/slider2.jpg';
import slide3 from '../img/slider3.jpg';
import slide4 from '../img/slider4.jpg';

export const images = [slide1, slide2, slide3, slide4];

//Informacion pagina sobre nosotros

import logo from "../img/logoSoless.png";

export const inf_pagAboutUs = 
    {
        description: "Este proyecto tiene como objetivo construir una comunidad activa de amantes de la moda callejera, creando una tienda en línea donde los clientes no solo compren, sino que participen activamente en la marca a través de votaciones y sorteos. Además, se busca establecer una presencia fuerte en redes sociales para mantener el engagement de los usuarios y atraer a nuevos seguidores globales, aprovechando la popularidad del movimiento sneakerhead.",
        mision: "Crear una comunidad vibrante y auténtica de sneakerheads y amantes del streetwear, ofreciendo productos de moda exclusivos, de alta calidad y de marcas reconocidas. A través de la participación activa de nuestra comunidad y un enfoque en el estilo y la creatividad, buscamos conectar a personas apasionadas por la moda urbana, ofreciendo una experiencia de compra única y personalizada que celebre el estilo y la autenticidad.",
        vision: "Ser la marca líder en moda urbana y streetwear en el mercado, reconocida no solo por la calidad y autenticidad de nuestros productos, sino también por nuestra comunidad y nuestro compromiso con la innovación y la cultura sneakerhead. Aspiramos a convertirnos en un referente global que inspire a los amantes de la moda urbana, potenciando un espacio donde puedan expresar su estilo, participar en la evolución de la marca y experimentar lo último en tendencias.",
        title: "Nuesto equipo",
        img_logo: logo
    };

export const valores =
    {
        Autenticidad: "Valoramos la autenticidad en nuestra marca y en nuestra comunidad. Nos esforzamos por ser fieles a los orígenes y la cultura sneakerhead, respetando y promoviendo las tendencias de moda urbana con integridad.",
        Creatividad: "Fomentamos un espacio donde la libertad creativa es clave, permitiendo a nuestra comunidad explorar y expresar su estilo único sin limitaciones.",
        Innovación: "Estamos comprometidos con la innovación, desde la experiencia de compra hasta el diseño de nuestros productos, ofreciendo a nuestros clientes un enfoque fresco y emocionante de la moda.",
        Colaboración: "La opinión de nuestra comunidad es esencial. Escuchamos y valoramos sus ideas, involucrándolos activamente en la construcción y dirección de nuestra marca.",
        Calidad: "Nos enfocamos en ofrecer productos de las mejores marcas de streetwear y moda urbana, asegurando que cada artículo refleje los altos estándares de calidad y diseño que nuestros clientes esperan",
        Inclusión: "Buscamos crear una comunidad donde todos los amantes de la moda urbana se sientan bienvenidos, independientemente de su origen, estilo o nivel de fidelización, promoviendo un espacio inclusivo y respetuoso."
    };

//Informacion developers

import christian from "../img/christian.png"
import juanjo from "../img/juanjo.png";
import josemi from "../img/josemi.png";
import kilian from "../img/kilian.png";


export const developers = [
    {
        image: christian,
        name: "Christian Rodrigez Lara",
        description: "Líder de grupo y programador creativo, destacado por su perseverancia y capacidad para tomar decisiones estratégicas en proyectos tecnológicos."
    },
    {
        image: josemi,
        name: "Jose Miguel Toro Canillas",
        description: "Programador creativo y emprendedor, con enfoque en moda urbana y tecnología, especializado en desarrollo de software y marketing digital."
    },
    {
        image: kilian,
        name: "Kilian Mendez Avila",
        description: "Programador creativo, organizado y con habilidad para desarrollar ideas tecnológicas innovadoras."
    },
    {
        image: juanjo,
        name: "Juan Jose Tejada Gutierrez",
        description: "Programador innovador con una gran capacidad de aprendizaje y enfoque en soluciones eficientes."
    }
];

/* Proximamente big imgs */

import caribean from "../img/caribean.jpg";
import grass from "../img/grass.jpg";
import studio from "../img/studio.jpg";

export const bigImgs = [ 
    {
        image: caribean,
        alt: "caribean",
        name: "caribean"
    }, 
    {
        image: grass,
        alt: "grass",
        name: "grass"
    }, 
    {
        image: studio,
        alt: "studio",
        name: "studio"
    }
];

/* Proximamente products */

import next1 from "../img/next1.jpg";
import next2 from "../img/next2.jpg";
import next3 from "../img/next3.jpg";

export const nextProducts = [
    {
        id : 1,
        brand: "",
        discount_Price: 0,
        original_Price: 0,
        img_Name: next1,
        model: "",
        stock: 0,
        offer: false
    },
    {
        id : 2,
        brand: "",
        discount_Price: 0,
        original_Price: 0,
        img_Name: next2,
        model: "",
        stock: 0,
        offer: false
    },    
    {
        id : 3,
        brand: "",
        discount_Price: 0,
        original_Price: 0,
        img_Name: next3,
        model: "",
        stock: 0,
        offer: false
    }
];




