import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2'
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import SocialLogin from '../SocialLogin/SocialLogin';
// import SocialLogin from '../SocialLogin/SocialLogin';
const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        //  console.log("hello", user_captcha_value)
        //  console.log(validateCaptcha(user_captcha_value))
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true)
        }
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = (data) => {
        const email = data.mail;
        const password = data.password;
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: 'User Login Successful.',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
                reset
                navigate(from, { replace: true });
            })
    };
    return (

        <div>
            <Helmet>
                <title>login ||Search360</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content w-1/2 flex-col lg:flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="card  w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>

                                <input placeholder="Email" type="email" className="input input-bordered"
                                    {...register("mail", {
                                        required: "Email Address is required",
                                        pattern: {
                                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,

                                        }
                                    })}
                                    aria-invalid={errors.mail ? "true" : "false"}
                                />
                                {errors.mail && <p role="alert">{errors.mail?.message}</p>}
                                {errors.mail && errors.mail.type === "pattern" && (
                                    <p className="errorMsg">Email is not valid.</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">Password</label>
                                <input
                                    placeholder="password"
                                    className="input input-bordered"
                                    type="password"
                                    name="password"
                                    {...register("password", {
                                        required: true,
                                        minLength: {
                                            value: 6,
                                            message: 'Password should be less at least 6 characters',
                                        },
                                        // pattern: {
                                        //     value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{6,}$/,
                                        //     message:
                                        //         'Password should include at least one capital letter, one special character, and one number',
                                        // },
                                    }
                                    )}
                                />
                                {errors.password && errors.password.type === "required" && (
                                    <p className="errorMsg">Password is required.</p>
                                )}

                                {errors.password && errors.password.type === "minLength" && (
                                    <p className="errorMsg">
                                        Password should be at-least 6 characters.
                                    </p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <LoadCanvasTemplate />
                                </label>

                                <input placeholder="type the captcha above" onBlur={handleValidateCaptcha} type="text" className="input input-bordered"></input>




                            </div>

                            <div className="form-control mt-6">
                                <input type='submit' value="Login" disabled={false} className="btn btn-primary"></input>
                            </div>
                            <div>
                                <p className='mt-5'>Are You New in SearCh360? <span className='text-lg text-primary'><Link to="/signup">please Sign Up First</Link> </span> </p>
                            </div>
                            <SocialLogin></SocialLogin>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;


