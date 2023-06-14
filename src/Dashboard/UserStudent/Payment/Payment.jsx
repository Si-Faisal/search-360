// import React from 'react';

// import CheckOutForm from './CheckOutForm';
// // import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLoaderData } from 'react-router-dom';

// const stripePromise = loadStripe(import.meta.env.VITE_Getway_Pk);

// const Payment = () => {
//     const selectclasspayment = useLoaderData();
//     return (
//         <div className="w-3/4 mx-auto">
//             <div>
//                 <h2 className='text-3xl font-bold text-pink-500 py-6'> Make Payment For your Class</h2>
//             </div>
//             <div className='flex w-full px-6 py-4  mb-8 justify-evenly items-center'>
//                 <h1 className='font-bold text-success'>Class Name: {selectclasspayment.classname}</h1>
//                 <p>price: <span className='text-xl font-bold text-orange-700'>${ selectclasspayment.price}</span></p>
//             </div>
//             <Elements stripe={stripePromise}>
//                 <CheckOutForm data={selectclasspayment}></CheckOutForm>
//             </Elements>

//         </div>
//     );
// };

// export default Payment;