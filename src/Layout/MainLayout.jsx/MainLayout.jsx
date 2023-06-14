import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../Pages/Header/Header';
import Footer from '../../Pages/Footer/Footer';

const MainLayout = () => {
    const location = useLocation();

    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signup');
    return (
        <div>
            {noHeaderFooter || <Header></Header>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
        </div>
    );
};

export default MainLayout;