import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";

import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
// import { AuthContext } from "../../AuthProvider/AuthProvider";


const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const token = localStorage.getItem("access-token");
    // console.log(token)
    const handleGoogleSignIn = () => {

        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('https://search360-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                        // authorization: `bearer ${token}`
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }

    return (
        <div>
            <div className="divider"></div>
            <div className="w-full text-center my-4">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;