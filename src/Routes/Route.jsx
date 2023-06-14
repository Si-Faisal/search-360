// import {
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";
// import MainLayout from "../Layout/MainLayout.jsx/MainLayout";
// import Home from "../Home/Home";
// import Login from "../Pages/Login/Login";
// import SignUp from "../Pages/SignUp/SignUp";
// import DashBoardSliderBar from "../Dashboard/DashBoardSlideBar/DashBoardSliderBar";
// import MyClasses from "../Dashboard/UserStudent/MyClasses/MyClasses";
// import DashBoardLeftNav from "../Dashboard/DashBoardLeftNav/DashBoardLeftNav";
// import Allusers from "../Dashboard/Admin/Allusers/Allusers";
// import AddClass from "../Dashboard/Instractors/AddClass/AddClass";
// import ManageClasses from "../Dashboard/Admin/ManageClasses/ManageClasses";
// import MySelectClass from "../Dashboard/UserStudent/MySelectClass/MySelectClass";
// import Payment from "../Dashboard/UserStudent/Payment/Payment";
// import InstractorsInfo from "../Dashboard/Instractors/InstractorsInfo/InstractorsInfo";
// import DashBoardHome from "../Dashboard/DasBoardHome/DashBoardHome";
// // import ClassCard from "../Pages/classCard/ClassCard";
// import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";
// import InstractorRoute from "./InstractorRoute";
// import ClassCard from "../Pages/ClassCard/ClassCard";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <MainLayout></MainLayout>,
//         children: [
//             {
//                 path: "/",
//                 element: <Home></Home>
//             },
            
//             {
//                 path: "/login",
//                 element: <Login></Login>
//             },
//             {
//                 path: "/signup",
//                 element: <SignUp></SignUp>
//             },
//             {
//                 path: "/instractorinfo",
//                 element: <InstractorsInfo></InstractorsInfo>
//             },
//             {
//                 path: "/classes",
//                 element: <ClassCard></ClassCard>
//             }


//         ]
//     },
//     {
//         path: "/dashboard",
//         element: <DashBoardLeftNav></DashBoardLeftNav>,
//         children: [
//             {
//                 path: "/dashboard/",
//                 element: <PrivateRoute><DashBoardHome></DashBoardHome></PrivateRoute>
//             },

//             {
//                 path: "/dashboard/myclasses",
//                 element: <MyClasses></MyClasses>
//             },
//             {
//                 path: "/dashboard/allusers",
//                 element: <AdminRoute><Allusers></Allusers></AdminRoute>
//             },
//             {
//                 path: "/dashboard/addClass",
//                 element: <InstractorRoute><AddClass></AddClass></InstractorRoute>
//             },
//             {
//                 path: "/dashboard/manageclasses",
//                 element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
//             },
//             {
//                 path: "/dashboard/selectclass",
//                 element: <PrivateRoute><MySelectClass></MySelectClass></PrivateRoute>
//             },
//             {
//                 path: "/dashboard/selectclass/:id",
//                 element: <Payment></Payment>,
//                 loader: ({params}) => fetch(`http://localhost:5000/class/select/${params.id}`)
//             },
//             {
//                 path: "/dashboard/instractorinfo",
//                 element: <InstractorsInfo></InstractorsInfo>
//             }
            
    
//         ]
//     }
// ]);

// export default router;

