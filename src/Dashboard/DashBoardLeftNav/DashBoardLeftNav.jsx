import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBook, FaCalendarAlt, FaCartPlus, FaHome, FaHouseUser, FaShopify, FaShoppingCart, FaUsers, FaWallet } from 'react-icons/fa';
import { AiOutlineBars, AiOutlineMail, AiOutlineMenu } from "react-icons/ai";
import { BsFillCalendarCheckFill } from "react-icons/bs";
import { RiMailStarFill } from "react-icons/ri";
import { AuthContext } from '../../AuthProvider/AuthProvider';
import useUserData from '../../Hooks/useUserData';
import useAdmin from '../../Hooks/useAdmin';
import useInstractor from '../../Hooks/useInstractor';


const DashBoardLeftNav = () => {
    const [Admin, isAdminLoading] = useAdmin();
    const [isInstractor, isInstractorLoading] = useInstractor();
    // const isadmin = admin?.admin;
    // const [cart] = useCart();
    // console.log(admin)
    const { user } = useContext(AuthContext);

    const [role, setRole] = useState('');
   
    const [refetch, isUserLoading, isUser] = useUserData();
    
    

    if (isAdminLoading) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    if (isInstractorLoading) {
        return <span className="loading loading-dots loading-lg"></span>
    }

    console.log(isInstractor)

    return (
        <div>
            
            <div className="drawer lg:drawer-open">

                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    
                    <Outlet></Outlet>
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side bg-slate-400">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 text-lg  bg-slate-400 text-white">
                        {/* <!-- Sidebar content here --> */}
                        {
                             Admin.admin? <>
                                <li><Link> <FaHome></FaHome>Admin Home</Link></li>
                               
                                <li><Link to="/dashboard/manageclasses"> <AiOutlineBars></AiOutlineBars>Manage Classes</Link></li>
                                 <li><Link to="/dashboard/instractorinfo"> <FaBook></FaBook>Instractors</Link></li>
                                <li><Link to="/dashboard/allusers"> <FaUsers></FaUsers>All Users</Link></li>
                            </> :
                                <>{isInstractor.instractor  ? <>
                                    <li><Link> <FaHome></FaHome>Instractor Home</Link></li>
                                    <li><Link to="/dashboard/addClass"> <FaCartPlus></FaCartPlus> Add Class</Link></li>
                                    <li><Link to="/dashboard/instractorinfo"> <FaBook></FaBook>Instractors</Link></li>
                                     
                                </> : <>
                                        <li><Link> <FaHouseUser></FaHouseUser>User Home</Link></li>
                                        <li><Link to="/dashboard/myclasses"> <FaBook></FaBook> My Class</Link></li>

                                        <li><Link to="/dashboard/selectclass"> <FaBook></FaBook> My select class</Link></li>
                                        <li><Link> <FaWallet></FaWallet>Payment History</Link></li>
                                    
                                    
                                </>} </>
                        }
                        
                        <div className="divider text-yellow-500"></div>
                        <li><Link to="/"> <FaHouseUser></FaHouseUser> Home</Link></li>
                        <li><Link> <AiOutlineMenu></AiOutlineMenu>Menu</Link></li>
                        <li><Link to="/order/salad"> <FaShopify></FaShopify>Shop</Link></li>
                        <li><Link> <AiOutlineMail></AiOutlineMail>Contact</Link></li>
                    </ul>

                </div>
            </div>
           
        </div>
    );
};

export default DashBoardLeftNav;