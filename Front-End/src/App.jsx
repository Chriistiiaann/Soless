import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Home from "./Pages/Home"
import {Link, Route, Routes } from "react-router-dom";

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
