import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import {   useQuery, useQueryClient, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const MySelectClass = () => {

    const [selectClass, setSelectClass] = useState([]);

    const token = localStorage.getItem("access-token");
    const { user, loading } = useContext(AuthContext);

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



    useEffect(() => {
        
        isSelect.map(data => {
            if (user.email === data.userEmail) {
                const mySelectClass = isSelect.filter(data=> data.userEmail===user.email);
                setSelectClass(mySelectClass)
            }
        })
    }, [isSelect])


    const queryClient = useQueryClient();

    const notify = () => toast('we remove the selected class!');

    const handleRemoveCard =async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/class/select/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearar ${token}`,
                },
            });
            const data = await res.json();
            console.log(data);
            if (data.deletedCount > 0) {
                notify();
            }
            // Invalidate the query to trigger a refetch
            queryClient.invalidateQueries('select')
        } catch (error) {
            console.error('Error removing class:', error);
        }
    }

    console.log(selectClass)



    return (
        <div>
            <h1 className='text-4xl text-center font-bold  py-8'>My Selected Class</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 w-full lg:grid-cols-2 gap-4'>
                {
                    selectClass.map(data => <div key={data._id} className="card bg-base-100 shadow-xl m-0 p-2 image-full">

                        <figure><img className='w-full' src={data.image} alt="Shoes" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{data.classname}</h2>
                            <div className='flex w-full'>
                                <div className='w-1/2'>
                                    <h2 className='font-bold text-xl text-success'>Features</h2>
                                    <ol>
                                        {data.features.slice(0, 2).map((info, index) => <li key={index} className='text-left'>{index + 1}.{info.name.slice(0,40)}...</li>)}
                                        
                                    </ol>
                                </div>
                                <div className='w-1/2'>
                                    <h2 className='text-xl text-success'>Price: <span className='text-red-600 text-2xl font-bold'>${data.price}</span></h2>
                                    <h2 className='text-xl text-success'>Seat: <span className='text-red-600 text-2xl font-bold'>{data.seat }</span></h2>
                                </div>
                            </div>
                            <div className="card-actions  justify-end">
                                <button onClick={() => handleRemoveCard(data._id)} className="btn btn-outline btn-secondary  ">Remove</button>
                                <button className="btn btn-outline btn-secondary  ">view Details</button>
                                <Link to={`/dashboard/selectclass/${data._id}`}><button className="btn  btn-secondary  ">Enroll Now</button></Link>
                            </div>
                        </div>
                    </div>  )
                }
                

            </div>
            <ToastContainer
                position="top-left"
                autoClose={3970}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            
        </div>
    );
};

export default MySelectClass;