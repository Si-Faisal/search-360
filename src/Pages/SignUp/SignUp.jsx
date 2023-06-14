// import React, { useContext, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useForm } from 'react-hook-form';
// import { Link, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../AuthProvider/AuthProvider';
// import SocialLogin from '../SocialLogin/SocialLogin';

// const SignUp = () => {
//     const [uploadedImageUrl, setUploadedImageUrl] = useState('');
//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//         watch,
//     } = useForm();

//     const { createUser, updateUserProfile } = useContext(AuthContext);
//     const navigate = useNavigate();

//     const onSubmit = async (data) => {
//         const { name, address, image, email, password, repassword } = data;

//         if (password !== repassword) {
//             return alert('Password and Re-Password fields should match.');
//         }

//         // Password validation
//         // const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/;
//         // if (!passwordRegex.test(password)) {
//         //     return alert(
//         //         'Password should be at least 6 characters and include at least one capital letter, one special character, and one number.'
//         //     );
//         // }

//         const fileInput = document.querySelector('input[type="file"]');
//         const imageFile = fileInput.files[0];

//         const token = localStorage.getItem('access-token');
//         const formData = new FormData();
//         formData.append('image', imageFile);

        
//         fetch('http://localhost:5000/upload', {
//             method: 'POST',
//             body: formData
//         })
//             .then(res => res.json())
//             .then(imgResponse => {
//                 if (imgResponse.success) {
//                     const imgURL = imgResponse.data.display_url;
//                     console.log(imgURL);

//                     createUser(email, password)
//                         .then((result) => {
//                             const loggedUser = result.user;

//                             updateUserProfile(name, imgURL, address)
//                                 .then(() => {
//                                     const userInformation = {
//                                         name: name,
//                                         email: email,
//                                         address: address,
//                                         userImage: imgURL,
//                                     };

//                                     const token = localStorage.getItem('access-token');

//                                     fetch('http://localhost:5000/users', {
//                                         method: 'POST',
//                                         headers: {
//                                             'content-type': 'application/json',
//                                             authorization: `bearer ${token}`,
//                                         },
//                                         body: JSON.stringify(userInformation),
//                                     })
//                                         .then((res) => res.json())
//                                         .then((data) => {
//                                             if (data.insertedId) {
//                                                 reset();
//                                                 Swal.fire({
//                                                     position: 'top-end',
//                                                     icon: 'success',
//                                                     title: 'User created successfully.',
//                                                     showConfirmButton: false,
//                                                     timer: 1500,
//                                                 });
//                                                 navigate('/');
//                                             }
//                                         })
//                                         .catch((error) => console.log(error));
//                                 })
//                                 .catch((error) => console.log(error));
//                         })
//                         .catch((error) => console.log(error));
//                 }
//             })
//             .catch((error) => console.log(error));

       
//     };

//     return (
//         <div>
//             <Helmet>
//                 <title>Sign Up || Search360</title>
//             </Helmet>
//             <div className="hero min-h-screen bg-[#242c246e] text-white">
//                 <div className="hero-content w-3/4 flex-col lg:flex-col">
//                     <div className="text-center lg:text-left">
//                         <h1 className="text-5xl font-bold">Please Register Here!</h1>
//                     </div>
//                     <form onSubmit={handleSubmit(onSubmit)} className="card  w-full  shadow-2xl text-black bg-[#413a3a66]">
//                         <div className="card-body">
//                             <div className="grid grid-cols-2 gap-10">
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Name</span>
//                                     </label>
//                                     <input
//                                         placeholder="Name"
//                                         type="text"
//                                         className="input input-bordered"
//                                         {...register('name', {
//                                             required: 'Name is required',
//                                         })}
//                                         aria-invalid={errors.name ? 'true' : 'false'}
//                                     />
//                                     {errors.name && <p role="alert">{errors.name.message}</p>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Address</span>
//                                     </label>
//                                     <input
//                                         placeholder="Address"
//                                         type="text"
//                                         className="input input-bordered"
//                                         {...register('address', {
//                                             required: 'Address is required',
//                                         })}
//                                         aria-invalid={errors.address ? 'true' : 'false'}
//                                     />
//                                     {errors.address && <p role="alert">{errors.address.message}</p>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Input Your Photo</span>
//                                     </label>
//                                     <input
//                                         placeholder="Photo input"
//                                         type="file"
//                                         className="file-input file-input-bordered w-full max-w-xs"
//                                         {...register('image', {
//                                             required: 'Image file is required',
//                                         })}
//                                         aria-invalid={errors.image ? 'true' : 'false'}
//                                     />
//                                     {errors.image && <p role="alert">{errors.image.message}</p>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Email</span>
//                                     </label>
//                                     <input
//                                         placeholder="Email"
//                                         type="email"
//                                         className="input input-bordered"
//                                         {...register('email', {
//                                             required: 'Email is required',
//                                             pattern: {
//                                                 value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                                                 message: 'Email is not valid',
//                                             },
//                                         })}
//                                         aria-invalid={errors.email ? 'true' : 'false'}
//                                     />
//                                     {errors.email && <p role="alert">{errors.email.message}</p>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">Password</label>
//                                     <input
//                                         placeholder="Password"
//                                         className="input input-bordered"
//                                         type="password"
//                                         {...register('password', {
//                                             required: 'Password is required',
//                                             minLength: {
//                                                 value: 6,
//                                                 message: 'Password should be at least  6 characters',
//                                             },
//                                             pattern: {
//                                                 value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
//                                                 message:
//                                                     'Password should include at least one capital letter, one special character, and one number',
//                                             },
//                                         })}
//                                     />
//                                     {errors.password && <p className="errorMsg">{errors.password.message}</p>}
//                                 </div>
//                                 <div className="form-control">
//                                     <label className="label">
//                                         <span className="label-text">Re-Password</span>
//                                     </label>
//                                     <input
//                                         placeholder="Re-Password"
//                                         className="input input-bordered"
//                                         type="password"
//                                         {...register('repassword', {
//                                             required: 'Re-Password is required',
//                                             minLength: {
//                                                 value: 6,
//                                                 message: 'Re-Password should be at least 6 characters',
//                                             },
//                                             validate: (value) =>
//                                                 value === watch('password') || 'Passwords do not match',
//                                         })}
//                                     />
//                                     {errors.repassword && <p className="errorMsg">{errors.repassword.message}</p>}
//                                 </div>
//                             </div>
//                             <div className="form-control mt-6">
//                                 <input className="btn btn-primary" type="submit" value="Sign up" />
//                             </div>
//                             <SocialLogin />
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignUp;
