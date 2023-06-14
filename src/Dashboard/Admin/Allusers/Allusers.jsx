import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './Allusers.css'
import useUserData from '../../../Hooks/useUserData';

const Allusers = () => {
    const token = localStorage.getItem("access-token");
    // const [value, setValue] = useState('');
    const [refetch, isUserLoading, isUser] = useUserData();

    // console.log(token)
    // const { refetch: refetch, data: user = []   } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch("https://search360-server.vercel.app/users", {
    //             method: "GET",
    //             headers: {
    //                 authorization: `bearar ${token} `
    //             }
    //         })
    //         return res.json();
    //     }

    // })

    // console.log(user);


    const handlechangeStatus = (id, selectValue) => {
        // const info = { id, selectValue }
        // console.log(info);
        const token = localStorage.getItem('access-token');
        fetch(`https://search360-server.vercel.app/users/admin/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `bearar ${token} `
                
            },
            body: JSON.stringify({ status: selectValue })


        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {

                    refetch(),
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Congrats  You have been ${selectValue}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                }
            })

    }

    const handleDeletuser = (id) => {
        console.log(id)
    }

    // const getInitialState = () => {
    //     const value = "Orange";
    //     return value;
    // };





    const handleSwitch = (inputValue, id) => {
        // setValue(inputValue);
        handlechangeStatus(id, inputValue)
        console.log(inputValue, id)


    };

    // console.log(value)
    return (
        <div>
            <h3>Total Users:{isUser.length}</h3>
            <div className="overflow-x-auto h-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isUser?.map((data, index) => <tr key={data._id}>
                                <th>{index + 1}</th>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                {/* <td>{
                                    data.role === "admin" ? "admin" : <button onClick={() => handleAdmin(data._id)} className=' bg-orange-600 btn-sm btn'><FaUsers></FaUsers></button>
                                }</td> */}
                                <td>
                                    <div className="dropdown z-4">
                                        <label tabIndex={0} className="m-1 btn z-4 ">{data.role ? data.role : "student"}</label>
                                        <ul tabIndex={0} className="p-2 shadow menu dropdown-content bg-base-100  block rounded-box ">
                                            <li><a onClick={() => handleSwitch("admin", data._id)}> admin</a></li>
                                            <li><a onClick={() => handleSwitch("instractor", data._id)}>instractor</a></li>
                                            {/* <li><a onClick={() => handleSwitch("student", data._id)}>student</a></li> */}
                                        </ul>
                                    </div>
                                </td>
                                <td><button onClick={() => handleDeletuser(data._id)} className=' bg-orange-600 btn-sm btn'><FaTrashAlt></FaTrashAlt></button></td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allusers;