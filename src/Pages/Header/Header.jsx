// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import { AuthContext } from '../../AuthProvider/AuthProvider';
// import logo from '../../assets/images/download.png'

// const Header = () => {
//     const { user, logOut } = useContext(AuthContext);

   

//     return (
//         <div>
//             <div className="navbar bg-base-100 ">
//                 <div className="navbar-start">
//                     <div className="dropdown">
//                         <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
//                         </label>
//                         <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//                             <li ><Link to="/">Home</Link ></li>
//                             <li>
//                                 <Link to="/instractorinfo">Instractor</Link >
                                
//                             </li>
//                             <li><Link >classes</Link ></li>
//                             {
//                                 user && <li><Link >DashBoard</Link ></li>
//                             }
                           
//                         </ul>
//                     </div>
//                     <Link  className="btn hidden-sm  btn-ghost normal-case text-xl">
//                         <div className="avatar">
//                             <div className="w-16 xs:invisible sm:invisible lg:visible rounded">
//                                 <img src={logo} alt="search360 logo" />
//                             </div>
//                         </div>
//                     </Link >
//                 </div>
//                 <div className="navbar-center hidden lg:flex">
//                     <ul className="menu font-bold text-lg menu-horizontal px-1">
//                         <li><Link >Home</Link ></li>
//                         <li>
//                             <Link to="/instractorinfo">Instractor</Link >

//                         </li>
                        
//                         <li><Link to="/classes">Classes</Link ></li>
//                         {user && <li><Link to="/dashboard">DashBoard</Link></li>}
//                     </ul>
                    
//                 </div>
//                 <div className="form-control grow-1  lg:me-auto ">
//                     <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
//                 </div>
               
               
//                 <div className="navbar-end">
//                     {user ? <div className="flex-none">
//                         <div className="dropdown dropdown-end">
//                             <label tabIndex={0} className="btn btn-ghost btn-circle">
//                                 <div className="indicator">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
//                                     <span className="badge badge-sm indicator-item">8</span>
//                                 </div>
//                             </label>
//                             <div tabIndex={0} className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
//                                 <div className="card-body">
//                                     <span className="font-bold text-lg">8 Items</span>
//                                     <span className="text-info">Subtotal: $999</span>
//                                     <div className="card-actions">
//                                         <button className="btn btn-primary btn-block">View cart</button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="dropdown dropdown-end">
//                             <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//                                 <div className="w-10 rounded-full">
//                                     <img src={user?.photoURL} />
//                                 </div>
//                             </label>
//                             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-slate-300 z-10 rounded-box w-52">
//                                 <li>
//                                     <a className="justify-between">
//                                         Profile
//                                         <span className="badge">New</span>
//                                     </a>
//                                 </li>
//                                 <li><a>Settings</a></li>
//                                 <li><a onClick={logOut}>Logout</a></li>
//                             </ul>
//                         </div>
//                     </div> : <Link to="login"> <button className="btn btn-outline btn-primarry">Login</button> </Link>}
                    
                   
//                 </div>
//             </div>
           
//        </div>
//     );
// };

// export default Header;

