import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBook, FaCalendarAlt, FaCartPlus, FaHome, FaHouseUser, FaShopify, FaShoppingCart, FaUsers, FaWallet } from 'react-icons/fa';
import { AiOutlineBars, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiMailStarFill } from "react-icons/ri";
// import useCart from '../../Hook/useCart';
// import useAdmin from '../../Hook/useAdmin';

const DashBoardSliderBar = () => {
    // const [admin] = useAdmin();
    // const isadmin = admin?.admin;
    // const [cart] = useCart();
    // console.log(admin)
    const cart = null;
    const isadmin = false;
    return (
        <div className="drawer  drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* <!-- Page content here --> */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                <Outlet></Outlet>

            </div>
            <div className="drawer-side  bg-red-800 h-full text-white">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <div className='px-10 py-3 m-0'>
                    <h1 className='font-bold m-0 text-3xl'>Bistro Boss</h1> <br />
                    <h3 className='m-0'>Restaurant</h3>

                </div>
                <ul className="menu  p-4 w-80 text-white ">
                    {/* <!-- Sidebar content here --> */}
                    {
                        isadmin ? <>
                            <li><Link> <FaHome></FaHome>Admin Home</Link></li>
                            <li><Link to="/dashboard/addfood"> <FaCartPlus></FaCartPlus> Add Food</Link></li>
                            <li><Link to="/dashboard/manageItem"> <AiOutlineBars></AiOutlineBars>Manage Item</Link></li>
                            <li><Link to="/dashboard/mycart"> <FaShoppingCart></FaShoppingCart>My Cart  <div className="badge badge-secondary">+{cart?.length || 0}</div></Link></li>
                            {/* <li><Link> <FaBook></FaBook> Manage Bookings</Link></li> */}
                            <li><Link> <FaBook></FaBook>select class</Link></li>
                            <li><Link to="/dashboard/allusers"> <FaUsers></FaUsers>All Users</Link></li>
                        </> : <>
                            <li><Link> <FaHouseUser></FaHouseUser>User Home</Link></li>
                            <li><Link to="/dashboard/myclasses"> <FaShoppingCart></FaShoppingCart>My Classes <div className="badge badge-secondary">+{cart?.length || 0}</div></Link></li>
                            <li><Link> <FaCalendarAlt></FaCalendarAlt>Reservation</Link></li>
                            <li><Link> <FaWallet></FaWallet>Payment History</Link></li>
                            <li><Link> <RiMailStarFill></RiMailStarFill>Add Review</Link></li>
                            <li><Link> <BsFillCalendarCheckFill></BsFillCalendarCheckFill>My Booking</Link></li>
                        </>
                    }
                    <div className="divider text-yellow-500"></div>
                    <li><Link to="/"> <FaHouseUser></FaHouseUser> Home</Link></li>
                    <li><Link> <AiOutlineMenu></AiOutlineMenu>Menu</Link></li>
                    <li><Link to="/order/salad"> <FaShopify></FaShopify>Shop</Link></li>
                    <li><Link> <AiOutlineMail></AiOutlineMail>Contact</Link></li>

                </ul>

            </div>
        </div>
    );
};

export default DashBoardSliderBar;