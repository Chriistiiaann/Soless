import { bigImgs} from "../data/data.js";
import "./styles/Module.Proximamente.css";

function Proximamente() {
    return (
        <div className="container-proximamente">
            <h1 className="title-proximamente">Proximamente</h1>

            {bigImgs.map((img, index) => (
                <img key={index} src={img.image} alt={img.alt} className="big-img-proximamente"/>
            ))}
        </div>
    )
}

export default Proximamente