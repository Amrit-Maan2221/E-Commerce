import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import SingleProduct from "../pages/product/SingleProduct";
import Footer from "../components/Footer";
import Products from "../pages/product/Products";

const ECommerceLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};


export const ECommerceRoutes = [
    {
        path: "/",
        element: <ECommerceLayout />,
        children: [

            {
                path: "/singleproduct/:id",
                element: <SingleProduct />,
            },
            {
                path: "/products",
                element: <Products />,
            },

        ]
    }
];