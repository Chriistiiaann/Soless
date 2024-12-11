import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const storedUserLS = localStorage.getItem("user");
    const tokenLS = localStorage.getItem("authToken");
    const [user, setUser] = useState(storedUserLS ? JSON.parse(storedUserLS) : null);
    const [token, setToken] = useState(tokenLS || null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    const login = (userData, token) => {
        setUser(userData);  
        setIsAuthenticated(true); 
        setToken(token);
        console.log("token", token);
        localStorage.setItem("authToken", token); 
        localStorage.setItem("user", JSON.stringify(userData));
        if (userData.role === "admin") {
            setIsAdmin(true);
        }
        
        navigate("/"); 
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        setToken(null);
        localStorage.removeItem("authToken");  
        localStorage.removeItem("user");  
        console.log("borrando carrito")
        localStorage.removeItem("carrito");  
        console.log("carrito borrado")
       
    };

    const updateUserData = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    useEffect(() => {
        // Verificar si hay un token y un usuario almacenados en localStorage
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("authToken");

        // Si los 2 existen, cargar los datos
        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setToken(token);
                setIsAuthenticated(true);
                console.log("Usuario cargado desde localStorage:", parsedUser);
            } catch (error) {
                console.error("Error al analizar el usuario de localStorage:", error);
                logout();  // Si hay un error al parsear, logout
            }
           
        }
    }, []); // Solo se ejecuta al montar el componente

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, token, isAdmin, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};