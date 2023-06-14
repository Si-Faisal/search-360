import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useInstractor from "../Hooks/useInstractor";




const InstractorRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    // 
    const [isInstractor, isInstractorLoading] = useInstractor();
    const location = useLocation();

    if (loading || isInstractorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isInstractor) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} replace></Navigate>
};

export default InstractorRoute;