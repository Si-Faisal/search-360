import React, { useContext } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useClasses from '../../../Hooks/useClasses';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageClasses = () => {

    const { user } = useContext(AuthContext);
    const [refetch, classLoading, isClass] = useClasses();


    if (classLoading) {
        return <span className="loading text-red-600 loading-ring loading-lg">Loading</span>
    }
    

    const handleDeletitem = (item) => {
        console.log(item)
        Swal.fire({
            title: 'feedBack?',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Look up',
            showLoaderOnConfirm: true,
            preConfirm: (login) => {
                return fetch(`//api.github.com/users/${login}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.statusText)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Request failed: ${error}`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: `${result.value.login}'s avatar`,
                    imageUrl: result.value.avatar_url
                })
            }
        })
        
    }


    const handleApproved = (id) => {
        const  statusinfo = {status:"approved"}
        fetch(`http://localhost:5000/classes/admin/${id}`, {

            method: "PATCH",
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(statusinfo)

        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {

                    refetch()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'approved the class',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })

    }



    return (
        <div className='w-full  h-full ms-4  mt-12 mx-auto'>
            <div className='text-center py-7 '>
                <h1 className='text-2xl font-bold'>Manase Instractor Pending Classes</h1>
            </div>
           
            <div className="overflow-x-auto w-full">
                <table className="table w-full table-xs">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Class img</th>
                            <th>Instractor Name</th>
                            <th>Instractor Email</th>
                            <th>Seat</th>
                            <th>price</th>
                            <th>status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                             isClass.map((rowData, index) => <tr key={rowData._id}>
                                <th>{index + 1}</th>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={rowData.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{rowData.classname}</div>
                                            
                                        </div>
                                    </div>

                                </td>
                                <td>{rowData.instractorname }</td>
                                <td>{rowData.instractoremail}</td>
                                <td>{rowData.seat}</td>
                                <td>{rowData.price}</td>
                                <td>{
                                     rowData.status === "pending" ? <button className=' bg-orange-600 btn-sm btn tooltip'  data-tip="Click to approved" onClick={() => handleApproved(rowData._id)} >pending</button> : rowData.status ? rowData.status : "Error" 
                                } </td>
                                 <td><button className="btn" onClick={() => window.my_modal_5.showModal()}>open modal</button>
                                     <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                                         <form method="dialog" className="modal-box">
                                             <h3 className="font-bold text-lg">Hello!</h3>
                                             <p className="py-4">Press ESC key or click the button below to close</p>
                                             <div className="modal-action">
                                                 {/* if there is a button in form, it will close the modal */}
                                                 <button className="btn">Close</button>
                                             </div>
                                         </form>
                                     </dialog>
                                 </td>
                            </tr> )
                        }
                        
                        
                    </tbody>
                    
                </table>
            </div>
            
        </div>
    );
};

export default ManageClasses;

// instractorname, instractoremail, classname, price: parseFloat(price), description, features, seat,  image: imgURL ,status

