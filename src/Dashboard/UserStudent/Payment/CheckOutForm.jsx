import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../AuthProvider/AuthProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Alert } from 'daisyui';

const CheckOutForm = ({ data }) => {
    const { user } = useContext(AuthContext);
    const stripe = useStripe();
    const elements = useElements();
    const [err, setErr] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transition, setTransition] = useState('');
    const [succ, setSucc] = useState('');
    const [processing, setProcessing] = useState(false);
    const [cardComplete, setCardComplete] = useState(false);

    console.log(data);
    const price = data.price;
    const token = localStorage.getItem('access-token');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('https://search360-server.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${token}`
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, []);

    const notify = () => toast('we successfully enroll the class!');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        if (!cardComplete) {
            return;
        }

        setProcessing(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (error) {
            console.log('[error]', error);
            setErr(error.message);
            setProcessing(false);
            return;
        }

        setErr('');

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    email: user?.email || 'unknown',
                    name: user?.displayName || 'anonymous'
                },
            },
        });

        if (confirmError) {
            setErr(confirmError.message)
            console.log(confirmError);
            setProcessing(false);

            return;
        }

        console.log(paymentIntent);

        if (paymentIntent?.status === 'succeeded') {
            setTransition(paymentIntent.id);
            setProcessing(false);
            resetForm();

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'payment successfully',
                showConfirmButton: false,
                timer: 1500
            });

            const paymentClass = {
                data,
                enroll: 'true',
                StudentName: user.displayName,
            };

            // available seat of the class reduce one seat after successfull payment..
            const seat = parseInt(data.seat);
            const restSeat = (seat - 1).toString();


            console.log("restseat", restSeat, "seat", seat);

            fetch(`https://search360-server.vercel.app/classes/${data.classId}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json",
                    authorization: `bearer ${token}`
                },
                body: JSON.stringify({ restSeat })
            })
                .then(res => res.json())
                .then(data => {
                    console.log("after payment reduce one set from available seat of class", data)
                })

            fetch(`https://search360-server.vercel.app/class/select/${data._id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('after payment delete selected api data', data);
                });

            fetch('https://search360-server.vercel.app/class/enroll', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${token}`
                },
                body: JSON.stringify(paymentClass)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('after payment save payment class is', data);
                    if (data.insertedId) {
                        notify();
                        setSucc('Your payment done successfully and Your class are save on the My class page');
                    }
                });
        }
    };

    const resetForm = () => {
        setCardComplete(false);
        elements.getElement(CardElement).clear();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                    onChange={(event) => {
                        setCardComplete(event.complete);
                        setErr(event.error ? event.error.message : '');
                    }}
                />

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

                <button className='btn btn-sm btn-primary mt-6' type="submit" disabled={!stripe || !cardComplete || processing}>
                    Pay
                </button>
            </form>
            {err && <div className="flex items-center mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path
                        d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                    />
                    <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm0 18a8 8 0 110-16 8 8 0 010 16zm1-11a1 1 0 10-2 0v5a1 1 0 102 0V7z"
                        clipRule="evenodd"
                    />
                </svg>
                <span className="block sm:inline">{err || ""}</span>
            </div>}

            {succ && transition && <div className="alert alert-success mt-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span> {succ} and your Transition Id is :  {transition}</span>
            </div>}
        </div>
    );
};

export default CheckOutForm;