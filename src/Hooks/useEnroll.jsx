// import React, { useContext } from 'react';
// import { AuthContext } from '../AuthProvider/AuthProvider';
// import { useQuery } from '@tanstack/react-query';

// const useEnroll = () => {

//     const token = localStorage.getItem("access-token");
//     const { user, loading } = useContext(AuthContext);


//     const { refetch: enrollrefetch, loading: enrollLoading, data: isEnroll = [] } = useQuery({
//         queryKey: ['enroll'],
//         enabled: !!user?.email && !!localStorage.getItem("access-token"),
//         queryFn: async () => {
//             const res = await fetch("http://localhost:5000/class/enroll", {
//                 method: "GET",
//                 headers: {
//                     authorization: `bearar ${token} `
//                 }
//             })
//             return res.json();
//         }

//     })



//     return [enrollrefetch, enrollLoading, isEnroll];
// };

// export default useEnroll;