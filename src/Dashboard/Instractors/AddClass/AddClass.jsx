
import { useForm } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';

import Swal from "sweetalert2";

import BlogCaption from '../../../Components/BlogCaption/BlogCaption';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../AuthProvider/AuthProvider';

const img_hosting_token = import.meta.env.VITE_img_hosting_token;

const AddClass = () => {

    // react hook form 's hook are this 
    const { register, handleSubmit, reset, control } = useForm();
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'features',
    });


    // const img_hosting_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting_token}`

    const { user, loading } = useContext(AuthContext);
    // console.log(user);

    if (loading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }

    const onSubmit = data => {

        // console.log(data)
        const fileInput = document.querySelector('input[type="file"]');
        const imageFile = fileInput.files[0];

        const token = localStorage.getItem('access-token');
        const formData = new FormData();
        formData.append('image', imageFile);
        
        fetch('http://localhost:5000/upload', {
            method: 'POST',
           
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    console.log(imgURL);
                    
                    const { classname, price, description, features, instractoremail, instractorname, seat } = data;
                    const status = "pending";

                    const classDetails = {
                        instractorname, instractoremail, classname, price: parseFloat(price), description, features, seat, instractorImage: user.photoURL,  image: imgURL ,status}
                    console.log(classDetails)
                    // axiosSecure.post('/menu', newItem)
                    fetch("http://localhost:5000/classes", {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            authorization: `bearer ${token}`
                        },
                        body: JSON.stringify(classDetails)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log('after posting class', data)
                            if (data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'class added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                        .catch(error => {
                            console.error('Failed to upload image:', error);
                        })
                }
            })

    };


    return (
        <div className="w-full px-10">

            <BlogCaption p={"import Your best speech?"} h1={"Add A Class"}></BlogCaption>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Instractor  Name*</span>
                    </label>
                    <input value={user?.displayName}  type="text" placeholder="Your Name "
                        {...register("instractorname", { required: true, maxLength: 120 })}
                        className="input input-bordered w-full " />

                    
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Instractor  Email*</span>
                    </label>
                    <input value={user?.email} type="text" placeholder="Your Email here"
                        {...register("instractoremail", { required: true, maxLength: 120 })}
                        className="input input-bordered w-full " />
                </div>
                <div className="form-control w-full mb-4">
                    <label className="label">
                        <span className="label-text font-semibold">Class Name*</span>
                    </label>
                    <input required type="text" placeholder="Class Name"
                        {...register("classname", { required: true, maxLength: 120 })}
                        className="input input-bordered w-full " />
                </div>
                <div className="flex my-4">
                    <div className="form-control w-full ">
                        <label className="label">
                            <span className="label-text">Available Seat</span>
                        </label>
                        <input required type="number" placeholder="Available seat"
                            {...register("seat", { required: true, maxLength: 120 })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input type="number" {...register("price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Class Description</span>
                    </label>
                    <textarea {...register("description", { required: true })} className="textarea textarea-bordered h-auto" placeholder="class Description"></textarea>
                </div>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Features</span>
                    </label>
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex mb-2">
                            <input
                                type="text"
                                {...register(`features[${index}].name`, { required: true })}
                                placeholder="Feature Name"
                                className="input input-bordered w-full"
                            />
                            <button
                                type="button"
                                onClick={() => remove(index)}
                                className="btn btn-error ml-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => append({ name: '' })}
                        className="btn btn-sm  mt-2"
                    >
                        Add Feature
                    </button>
                </div>
                <div className="form-control w-full my-4">
                    <label className="label">
                        <span className="label-text">class Cover Photo*</span>
                    </label>
                    <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                </div>
                <input className="btn btn-success mt-4" type="submit" value="Add class" />
            </form>
        </div>
    );
};

export default AddClass;


