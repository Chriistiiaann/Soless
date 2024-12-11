import { bigImgs, nextProducts } from "../data/data.js";
import "./styles/Module.Proximamente.css";
import Section from "../components/Section.jsx";

function Proximamente() {
    return (
        <div className="container-proximamente">
            <h1 className="title-proximamente">Proximamente</h1>

            {bigImgs.map((img, index) => (
                <img key={index} src={img.image} alt={img.alt} className="big-img-proximamente"/>
            ))}

            <div className="">
                return 
            </div>
        </div>
    )
}

export default Proximamente