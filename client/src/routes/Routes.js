import {
    createBrowserRouter,
    Outlet
} from "react-router-dom";


import UserInfo from "../pages/UserInfo";
import PrivateRoute from "../auth/PrivateRoute";
import Test from "../pages/Test";
import { AuthRoutes } from "./AuthRoutes";
import Homepage from "../pages/Homepage";
import Contact from "../pages/Contact";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ErrorPage from "../pages/ErrorPage";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};


const router = createBrowserRouter([

    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Homepage />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            }
        ]
    },
    ...AuthRoutes
    ,
    {
        path: "/test",
        element: <Test />,
    }
]);

export default router