import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useClasses = () => {

    const token = localStorage.getItem("access-token");
    const { user, loading } = useContext(AuthContext);
   

    const { refetch: refetch, loading: classLoading, data: isClass = [] } = useQuery({
        queryKey: ['classes'],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/classes", {
                method: "GET",
                headers: {
                    authorization: `bearar ${token} `
                }
            })
            return res.json();
        }

    })

   

    return [refetch,classLoading,isClass];
};

export default useClasses;