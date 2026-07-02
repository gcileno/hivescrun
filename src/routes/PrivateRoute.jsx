import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
    const token = localStorage.getItem('@HiveScrum:token');
    const isDev = import.meta.env.DEV;

    return token || isDev ? children : <Navigate to="/" replace />;
}