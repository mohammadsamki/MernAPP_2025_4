import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function AdminRoute({ children }) {
    const { user } = useAuth();
    const token = localStorage.getItem('token');
    if (!user || !token || user.role !== 'admin') {
        return <Navigate to="/" replace />;
    }
    return children;
}