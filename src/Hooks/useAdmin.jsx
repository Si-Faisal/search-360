import { useContext } from "react";
// import { AuthContext } from "../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";


const useAdmin = () => {
    const { user } = useContext(AuthContext);
    // const [axiosSecure] = useAxiosSecure();
    const token = localStorage.getItem("access-token")
    const { data: Admin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['Admin', user?.email],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/users/admin/${user?.email}`, {
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
    return [Admin, isAdminLoading];

};

export default useAdmin;