import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    const login = (userData, token) => {
        setUser(userData);  
        setIsAuthenticated(true); 
        localStorage.setItem("authToken", token); 
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/"); 
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("authToken");  
        localStorage.removeItem("user");  
        navigate("/login"); 
    };

    useEffect(() => {
        // Verificar si hay un token y un usuario almacenados en localStorage
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("authToken");

        // Si ambos existen, cargar los datos
        if (token && storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
                console.log("Usuario cargado desde localStorage:", parsedUser);
            } catch (error) {
                console.error("Error al analizar el usuario de localStorage:", error);
                logout();  // Si hay un error al parsear, logout
            }
        }
    }, []); // Solo se ejecuta al montar el componente

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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