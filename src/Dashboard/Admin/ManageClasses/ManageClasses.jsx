import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import useClasses from '../../../Hooks/useClasses';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaUsers } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Modal from 'react-modal';




const ManageClasses = () => {
    const { user } = useContext(AuthContext);
    const [refetch, classLoading, isClass] = useClasses();
    const [showModal, setShowModal] = useState(false);
    const [feedback, setFeedback] = useState('');

   


    if (classLoading) {
        return <span className="loading text-red-600 loading-ring loading-lg">Loading</span>
    }

    if (classLoading) {
        return <span className="loading text-red-600 loading-ring loading-lg">Loading</span>;
    }

    const handleApproved = (id) => {
        // Rest of your code
        const statusinfo = { status: "approved" };
        const token = localStorage.getItem("access-token");
        fetch(`https://search360-server.vercel.app/classes/admin/${id}`, {

            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `bearar ${token} `
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
    };

    const handleDeny = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setFeedback('');
    };

    const confirmDeny = () => {
        // Handle your denial logic here
        console.log(feedback);

        closeModal();
    };

    console.log(isClass)

    return (
        <div className="w-full h-full ms-4 mt-12 mx-auto">
            <div className="text-center py-7 ">
                <h1 className="text-2xl font-bold">Manase Instructor Pending Classes</h1>
            </div>

            <div className="overflow-x-auto w-full">
                <table className="table w-full table-xs">
                    <thead>
                        <tr>
                            <th>SN</th>
                            <th>Class img</th>
                            <th>Instructor Name</th>
                            <th>Instructor Email</th>
                            <th>Seat</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isClass.map((rowData, index) => (
                            <tr key={index}>
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
                                <td>{rowData.instractorname}</td>
                                <td>{rowData.instractoremail}</td>
                                <td>{rowData.seat}</td>
                                <td>{rowData.price}</td>
                                <td>
                                    {rowData.status === 'pending' ? (
                                        <button
                                            className="bg-orange-600 btn-sm btn tooltip"
                                            data-tip="Click to approve"
                                            onClick={() => handleApproved(rowData._id)}
                                        >
                                            pending
                                        </button>
                                    ) : rowData.status ? (
                                        rowData.status
                                    ) : (
                                        'Error'
                                    )}
                                </td>
                                <td>
                                    <button className="btn" onClick={() => handleDeny()}>
                                        Deny
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2 className="text-xl font-bold mb-4">Deny Feedback</h2>
                <div className="mb-4">
                    <label htmlFor="feedback" className="block font-bold mb-1">
                        Feedback:
                    </label>
                    <input
                        type="text"
                        id="feedback"
                        className="w-full border border-gray-300 rounded-md py-2 px-3"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                </div>
                <div className="text-center">
                    <button
                        className="bg-red-600 text-white py-2 px-4 rounded-md mr-2"
                        onClick={confirmDeny}
                    >
                        Confirm
                    </button>
                    <button className="border border-gray-300 py-2 px-4 rounded-md" onClick={closeModal}>
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default ManageClasses;




 // const handleDeletitem = (item) => {
    //     console.log(item)
    //     Swal.fire({
    //         title: 'feedBack?',
    //         input: 'text',
    //         inputAttributes: {
    //             autocapitalize: 'off'
    //         },
    //         showCancelButton: true,
    //         confirmButtonText: 'Look up',
    //         showLoaderOnConfirm: true,
    //         preConfirm: (login) => {
    //             return fetch(`//api.github.com/users/${login}`)
    //                 .then(response => {
    //                     if (!response.ok) {
    //                         throw new Error(response.statusText)
    //                     }
    //                     return response.json()
    //                 })
    //                 .catch(error => {
    //                     Swal.showValidationMessage(
    //                         `Request failed: ${error}`
    //                     )
    //                 })
    //         },
    //         allowOutsideClick: () => !Swal.isLoading()
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             Swal.fire({
    //                 title: `${result.value.login}'s avatar`,
    //                 imageUrl: result.value.avatar_url
    //             })
    //         }
    //     })

    // }