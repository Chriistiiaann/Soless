import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context_providers/AuthProvider";

function AdminRoute() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || user?.role !== "admin") {
        console.log(user.role);
        return <Navigate to="/Login" replace />;
    } else {
        return <Outlet />;
    }

}

export default AdminRoute;
