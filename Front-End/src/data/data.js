//Ofertas

import oimg1 from "../img/zapatillas altas Converse x Off-White Chuck 70.webp"
import oimg2 from "../img/zapatillas Chuck 70 Hi de Converse x Isabel Marant.webp"
import oimg4 from "../img/zapatillas Run Star Motion WhiteBlackGum.jpg"


export const ofertas = [
    {
        name: "Converse x Off-White",
        reviews: 9,
        reviewsImg: "🙂",
        image: oimg1,              
        stock: "Disponible",
        originalPrice: "2570",
        discountPrice: "2225",
    },
    {
        name: "Chuck 70 Hi Converse",
        reviews: 9,
        reviewsImg: "🙂",
        image: oimg2,              
        stock: "Disponible",
        originalPrice: "152",
        discountPrice: "120",
    },
    {
        name: "Run Star Motion",
        reviews: 9,
        reviewsImg: "🙂",
        image: oimg4,              
        stock: "Disponible",
        originalPrice: "168",
        discountPrice: "143",
    },
];

//Productos

import pimg1 from "../img/zapatillas bajas SB Dunk de Nike x Travis Scott 01.webp"
import pimg2 from "../img/zapatillas Air Force 1 de Nike x Louis Vuitton 01.webp"
import pimg3 from "../img/zapatillas Air Max 1-97 VF de Nike x Sean Wotherspoon 01.webp"
import pimg4 from "../img/zapatillas SB Dunk Low de Nike x Grateful Dead 01.jpg"

export const productos = [
    {
        name: "Dunk Travis",
        reviews: 9,
        reviewsImg: "🙂",
        image: pimg1, // Asegúrate de importar img1 correctamente
        stock: "Disponible",
        originalPrice: "2850",
        discountPrice: "2850", // Si no hay descuento, usa el mismo precio
    },
    {
        name: "AF1 LV",
        reviews: 9,
        reviewsImg: "🙂",
        image: pimg2, // Asegúrate de importar img2 correctamente
        stock: "Disponible",
        originalPrice: "13785",
        discountPrice: "13785", // Si no hay descuento, usa el mismo precio
    },
    {
        name: "Air Max 1/97",
        reviews: 9,
        reviewsImg: "🙂",
        image: pimg3, // Asegúrate de importar img3 correctamente
        stock: "Disponible",
        originalPrice: "2205",
        discountPrice: "2205", // Si no hay descuento, usa el mismo precio
    },
    {
        name: "Dunk Low SB",
        reviews: 9,
        reviewsImg: "🙂",
        image: pimg4, // Asegúrate de importar img4 correctamente
        stock: "Disponible",
        originalPrice: "1175",
        discountPrice: "1175", // Si no hay descuento, usa el mismo precio
    }
];

//Proximamente

import proximg1 from "../img/zapatillas altas Converse x Off-White Chuck 70.webp"
import proximg2 from "../img/zapatillas Chuck 70 Hi de Converse x Isabel Marant.webp"
import proximg3 from "../img/zapatillas Air Max 1-97 VF de Nike x Sean Wotherspoon 01.webp"
import proximg4 from "../img/zapatillas Run Star Motion WhiteBlackGum.jpg"

export const proximamente = [
    {
        name: "Dunk Travis",
        reviews: 9,
        reviewsImg: "🙂",
        image: proximg1, // Asegúrate de importar img1 correctamente
        stock: "Disponible",
        originalPrice: "1850",
        discountPrice: "1850", // Si no hay descuento, usa el mismo precio
    },
    {
        name: "Dunk Travis",
        reviews: 9,
        reviewsImg: "🙂",
        image: proximg2, // Asegúrate de importar img2 correctamente
        stock: "Disponible",
        originalPrice: "1850",
        discountPrice: "1850", // Si no hay descuento, usa el mismo precio
    },
    {
        name: "Dunk Travis",
        reviews: 9,
        reviewsImg: "🙂",
        image: proximg3, // Asegúrate de importar img3 correctamente
        stock: "Disponible",
        originalPrice: "1850",
        discountPrice: "1850", // Si no hay descuento, usa el mismo precio
    },
    {
        name: "Dunk Travis",
        reviews: 9,
        reviewsImg: "🙂",
        image: proximg4, // Asegúrate de importar img4 correctamente
        stock: "Disponible",
        originalPrice: "1850",
        discountPrice: "1850", // Si no hay descuento, usa el mismo precio
    }
];

//Image Slides Carousel

import slide1 from '../img/foto2.jpg';
import slide2 from '../img/foto1.jpg';
import slide3 from '../img/foto3.jpg';

export const images = [slide1, slide2, slide3];

//Catalogo

import cimg1 from "../img/zapatillas altas Converse x Off-White Chuck 70.webp"
import cimg2 from "../img/zapatillas Chuck 70 Hi de Converse x Isabel Marant.webp"
import cimg3 from "../img/zapatillas Air Max 1-97 VF de Nike x Sean Wotherspoon 01.webp"
import cimg4 from "../img/zapatillas Run Star Motion WhiteBlackGum.jpg"
import cimg5 from "../img/zapatillas bajas SB Dunk de Nike x Travis Scott 01.webp"

export const zapatillas = [
    { id: 1, brand: "Converse", model: "x Off-White", img_Name: cimg1, original_Price: 2700, discount_Price: 2500, stock: 2 }, // Pocas unidades
    { id: 2, brand: "Chuck", model: "70 Isabel", img_Name: cimg2, original_Price: 155, discount_Price: 130, stock: 5 }, // Disponible
    { id: 3, brand: "Air Max", model: "1/97 Sean", img_Name: cimg3, original_Price: 2205, discount_Price: 2100, stock: 0 }, // Agotado
    { id: 4, brand: "Run Star", model: "Motion", img_Name: cimg4, original_Price: 180, discount_Price: 150, stock: 5 }, // Disponible
    { id: 5, brand: "SB Dunk", model: "Travis Scott", img_Name: cimg5, original_Price: 2850, discount_Price: 2750, stock: 2 }, // Pocas unidades
    { id: 6, brand: "Converse", model: "Classic High", img_Name: cimg1, original_Price: 2600, discount_Price: 2400, stock: 5 }, // Disponible
    { id: 7, brand: "Chuck", model: "70 Hi", img_Name: cimg2, original_Price: 170, discount_Price: 145, stock: 2 }, // Pocas unidades
    { id: 8, brand: "Nike", model: "Air Max SW", img_Name: cimg3, original_Price: 2250, discount_Price: 2000, stock: 5 }, // Disponible
    { id: 9, brand: "Star Motion", model: "Black", img_Name: cimg4, original_Price: 190, discount_Price: 170, stock: 0 }, // Agotado
    { id: 10, brand: "Dunk", model: "Low TS", img_Name: cimg5, original_Price: 2950, discount_Price: 2850, stock: 5 }, // Disponible
    { id: 11, brand: "Converse", model: "Off-White", img_Name: cimg1, original_Price: 2700, discount_Price: 2550, stock: 0 }, // Agotado
    { id: 12, brand: "Isabel Marant", model: "Chuck", img_Name: cimg2, original_Price: 165, discount_Price: 140, stock: 2 }, // Pocas unidades
    { id: 13, brand: "Nike", model: "Air 1/97", img_Name: cimg3, original_Price: 2250, discount_Price: 2150, stock: 5 }, // Disponible
    { id: 14, brand: "Star Motion", model: "White", img_Name: cimg4, original_Price: 170, discount_Price: 150, stock: 5 }, // Disponible
    { id: 15, brand: "Dunk", model: "Travis Low", img_Name: cimg5, original_Price: 2950, discount_Price: 2850, stock: 2 }, // Pocas unidades
    { id: 16, brand: "Off-White", model: "Chuck 70", img_Name: cimg1, original_Price: 2700, discount_Price: 2600, stock: 5 }, // Disponible
    { id: 17, brand: "Isabel Marant", model: "Classic", img_Name: cimg2, original_Price: 160, discount_Price: 135, stock: 2 }, // Pocas unidades
    { id: 18, brand: "Air Max", model: "SW Sean", img_Name: cimg3, original_Price: 2280, discount_Price: 2200, stock: 5 }, // Disponible
    { id: 19, brand: "Run Star", model: "Gum", img_Name: cimg4, original_Price: 175, discount_Price: 160, stock: 2 }, // Pocas unidades
    { id: 20, brand: "Travis", model: "SB Dunk", img_Name: cimg5, original_Price: 3050, discount_Price: 2950, stock: 5 }, // Disponible
    { id: 21, brand: "Off-White", model: "Converse", img_Name: cimg1, original_Price: 2900, discount_Price: 2700, stock: 0 }, // Agotado
    { id: 22, brand: "Marant", model: "Chuck", img_Name: cimg2, original_Price: 155, discount_Price: 130, stock: 2 }, // Pocas unidades
    { id: 23, brand: "Nike", model: "Air Max 1/97", img_Name: cimg3, original_Price: 2290, discount_Price: 2200, stock: 5 }, // Disponible
    { id: 24, brand: "Run Star", model: "White", img_Name: cimg4, original_Price: 170, discount_Price: 150, stock: 5 }, // Disponible
    { id: 25, brand: "Dunk", model: "Low Travis", img_Name: cimg5, original_Price: 2850, discount_Price: 2750, stock: 0 }, // Agotado
    { id: 26, brand: "Converse", model: "Chuck Taylor", img_Name: cimg1, original_Price: 2000, discount_Price: 1800, stock: 5 }, // Disponible
    { id: 27, brand: "Nike", model: "Air Jordan 1", img_Name: cimg2, original_Price: 3200, discount_Price: 3000, stock: 2 }, // Pocas unidades
    { id: 28, brand: "Adidas", model: "Yeezy Boost 350", img_Name: cimg3, original_Price: 4000, discount_Price: 3800, stock: 0 }, // Agotado
    { id: 29, brand: "Puma", model: "Suede Classic", img_Name: cimg4, original_Price: 1200, discount_Price: 1000, stock: 5 }, // Disponible
    { id: 30, brand: "Reebok", model: "Classic Leather", img_Name: cimg5, original_Price: 1500, discount_Price: 1300, stock: 5 } // Disponible
];


