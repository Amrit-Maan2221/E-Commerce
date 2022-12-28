import {
    createBrowserRouter,
    Outlet
} from "react-router-dom";

import Test from "../components/Test";
import { AuthRoutes } from "./AuthRoutes";
import Homepage from "../components/home/Homepage";
import Contact from "../components/contact/Contact";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ErrorPage from "../components/common/ErrorPage";
import { ECommerceRoutes } from "./ECommerceRoutes";

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
    ...ECommerceRoutes
    ,
    {
        path: "/test",
        element: <Test />,
    }
]);

export default router