import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import { Route, Routes } from "react-router-dom";
import "./global.css"

function App() {
    return(
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
            </Routes>
        </>
    )
}

export default App;
