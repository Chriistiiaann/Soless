import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import Catalogo from "./Pages/Catalogo"
import AboutUs from "./Pages/AboutUs"
import Carrito from "./Pages/Carrito"
import BigLayout from "./Pages/BigLayout"
import ProductDetails from "./Pages/ProductDetails"; 
import { Route, Routes } from 'react-router-dom';
import "./global.css"
import { AuthProvider } from "./context_providers/AuthProvider"


function App() {
    return(
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<BigLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/Catalogo" element={<Catalogo />} />
                        <Route path="/Catalogo/:id" element={<ProductDetails />} />
                        <Route path="/AboutUs" element={<AboutUs />} />
                        <Route path="/Carrito" element={<Carrito />} />
                    </Route>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </AuthProvider>
    )
}

export default App;
