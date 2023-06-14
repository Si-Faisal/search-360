import React, { useContext, useEffect, useState } from 'react';
import useClasses from '../../Hooks/useClasses';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import useEnroll from '../../Hooks/useEnroll';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import useInstractor from '../../Hooks/useInstractor';
import useAdmin from '../../Hooks/useAdmin';


const ClassCard = () => {
    const [cardClass, setCardClass] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user, loading } = useContext(AuthContext);
    const [refetch, classLoading, isClass] = useClasses();
    const [classSelect, setClasSelect] = useState([]);
    const [enrollrefetch, enrollLoading, isEnroll] = useEnroll();

    const [Admin, isAdminLoading] = useAdmin();
    const [isInstractor, isInstractorLoading] = useInstractor();

    const navigate = useNavigate();
    const location = useLocation();
    
    

   


   



    useEffect(() => {
        const fetchClassData = async () => {
            try {
                const response = await fetch('http://localhost:5000/classes');
                if (!response.ok) {
                    throw new Error('Failed to fetch class data');
                }
                const data = await response.json();
                const approvedClass = data.filter((item) => item.status === 'approved');
                setCardClass(approvedClass);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClassData();
    }, []);

   
    


    

    

    const token = localStorage.getItem("access-token");
    
    const { refetch: refetchselect, loading: selectclassLoading, data: isSelect = [] } = useQuery({
        queryKey: ['select'],
        enabled: !!user?.email && !!localStorage.getItem("access-token"),
        queryFn: async () => {
            const res = await fetch("http://localhost:5000/class/select", {
                method: "GET",
                headers: {
                    authorization: `bearar ${token} `
                }
            })
            return res.json();
        }

    })

    // if (isAdminLoading) {
    //     return <span className="loading loading-dots loading-lg"></span>
    // }

    // if (isInstractorLoading) {
    //     return <span className="loading loading-dots loading-lg"></span>
    // }

    // if (isLoading) {
    //     return <span className="loading text-red-600 loading-ring loading-lg">Loading</span>;
    // }

    if (error) {
        return <div>Error: {error}</div>;
    }


    // if (selectclassLoading) {
    //     return <span className="loading text-red-600 loading-ring loading-lg">Loading</span>
    // }

    // const matchingEmail = isSelect.find(data => data.userEmail === user?.email);
    // // console.log(matchingEmail);
    const handleSelectClass = (info) => {
        if (user && user.email) {
            const userEmail = user.email;
            const mark = "select";
            const { instractorname, instractoremail, classname, price, description, features, seat, image } = info;
            const classinfo = { classId: info._id, instractorname, instractoremail, classname, price, description, features, seat, image, userEmail, mark }
            console.log(info)

            fetch("http://localhost:5000/class/select", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    // authorization: `bearer ${token}`
                },
                body: JSON.stringify(classinfo)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('after posting class', data)
                    if (data.insertedId) {
                        // reset();

                        setClasSelect(true)
                        refetchselect()
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'select class succesfully',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to Select The Class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }
    }





    
    console.log(cardClass);
    console.log(isEnroll);

   
    
    
    
    return (
        <div className='grid grid-cols-2 my-8 md:grid-cols-3 gap-10'>
            {
                 cardClass.map(info => <div key={info._id} className="card w-full m-0 p-0 bg-base-100 shadow-xl">
                    <figure className="p-2 mt-3 ">
                        <img src={info.image} alt="Shoes" className=" w-full rounded-xl" />
                    </figure>
                    <div className="card-body  text-center">
                        <h2 className="card-title text-2xl h-7 mb-6 font-bold">{info.classname}</h2>
                        <h3 className='text-lg text-slate-500'>Instractor: {info.instractorname}</h3>
                        <p></p>
                        <div className='flex justify-between py-3'>
                            <span className=' text-orange-700 text-xl font-bold'>Price: ${info.price}</span>
                            <span className='badge badge-secondary badge-lg  p-2 text-bold '>Available seat:{info.seat}</span>
                        </div>
                        <div className="card-actions justify-end">
                            {
                                isEnroll?.find(dt => dt.data.classId === info._id && dt.data.userEmail === user?.email) ? <div className='text-success borser border-2 btn-sm rounded-lg '>You enrolled</div> : <Link to=""><button className="btn btn-sm btn-outline text-orange-700">View details</button> </Link> 
                            }
                            
                            {
                                isEnroll?.find(dt => dt.data.classId === info._id && dt.data.userEmail === user?.email) ? <button className="btn btn-sm btn-outline text-orange-700">Continue Class</button> : isSelect?.find(data => data.classId === info._id && data.userEmail === user?.email) ? <div className='text-success borser border-2 btn-sm rounded-lg '>selected</div> : <button onClick={() => handleSelectClass(info)} disabled={Admin?.admin || isInstractor?.instractor} className="btn btn-sm btn-outline text-orange-700">mark as select </button>   
                            }
                            
                            
                        </div>
                    </div>
                </div>)
            }

        </div>
    );
};

export default ClassCard;