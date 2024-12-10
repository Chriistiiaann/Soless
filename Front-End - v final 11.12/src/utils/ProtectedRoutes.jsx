import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context_providers/AuthProvider";

const ProtectedRoutes = () => {
    const { user } = useAuth();
    // const token = localStorage.getItem("authToken");
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes