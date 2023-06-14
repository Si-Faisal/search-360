import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useUserData = () => {

    const token = localStorage.getItem("access-token");
    const { user } = useContext(AuthContext);

    const { refetch: refetch, loading: isUserLoading, data: isUser = [] } = useQuery({
        queryKey: ['users'],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/users", {
                method: "GET",
                headers: {
                    authorization: `bearar ${token} `
                }
            })
            return res.json();
        }

    })

    console.log(user);
    return [refetch, isUserLoading, isUser];
};

export default useUserData;