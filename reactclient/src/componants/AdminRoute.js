import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function AdminRoute({ children }) {
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    if (!user || !token || user.role !== 'admin') {
        console.log("Unauthorized access attempt to admin route");
        return <Navigate to="/" replace />;
    }
    return children;
}