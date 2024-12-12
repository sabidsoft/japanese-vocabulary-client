import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../redux/app/hooks";

export default function Home() {
    const auth = useAppSelector(state => state.auth);

    if (auth?.user?.role === 'User') {
        return <Navigate to="/lessons" replace />;
    }

    if (auth?.user?.role === 'Admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return <Navigate to="/login" replace />
}