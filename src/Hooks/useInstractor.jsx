import { useContext } from "react";
// import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useInstractor = () => {
    const { user } = useContext(AuthContext);
    // const [axiosSecure] = useAxiosSecure();
    const token = localStorage.getItem("access-token")
    const { data: isInstractor, isLoading: isInstractorLoading } = useQuery({
        queryKey: ['instractor', user?.email],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await fetch(`https://search360-server.vercel.app/users/instractor/${user?.email}`, {
                method: "GET",
                headers: {
                    authorization: `bearer ${token}`
                }
            });
            // const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            // console.log('is admin response', res)
            // const admin = res.admin;
            return res.json();
        }
    })
    return [isInstractor, isInstractorLoading];

};

export default useInstractor;