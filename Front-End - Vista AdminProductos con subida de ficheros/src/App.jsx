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
import Pedidos from "./Pages/Pedidos";
import CheckOut from "./Pages/CheckOut";
import Contacto from "./Pages/Contacto";
import ConfirmacionCompra from "./Pages/ConfirmacionCompra"
import AdminProductos from "./components/Admin-Productos"
import TablaAdmin from "./components/TablaAdmin"

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
                        <Route path="/Pedidos" element={<Pedidos />}/>
                        <Route path="/Checkout" element={<CheckOut />}/> 
                        <Route path="/ConfirmacionCompra" element={<ConfirmacionCompra />}/>
                        <Route path="/AdminProductos" element={<AdminProductos />} />
                        <Route path="/TablaAdmin" element={<TablaAdmin />} />
                        <Route path="/Contacto" element={<Contacto />} />
                    </Route>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Register" element={<Register />} />
                </Routes>
            </AuthProvider>
    )
}

export default App;
