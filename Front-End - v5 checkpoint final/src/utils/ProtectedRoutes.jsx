import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context_providers/AuthProvider";

const ProtectedRoutes = () => {
    const { user, token } = useAuth();
    console.log("user protected routes", user);
    console.log("token protected routes", token);
    // const token = localStorage.getItem("authToken");
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes