import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Catalogo from "./Pages/Catalogo"
import AboutUs from "./Pages/AboutUs"
import BigLayout from "./Pages/BigLayout"
import { Route, Routes } from 'react-router-dom';
import "./global.css"

function App() {
    return(
                <Routes>
                    <Route path="/" element={<BigLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/Catalogo" element={<Catalogo />} />
                        <Route path="/AboutUs" element={<AboutUs />} />
                    </Route>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
    )
}

export default App;
