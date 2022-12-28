import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import SingleProduct from "../components/product/SingleProduct";
import Footer from "../components/common/Footer";
import Products from "../components/product/Products";
import Cart from "../components/cart/Cart";

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
            {
                path: "/cart",
                element: <Cart />,
            },
        ]
    }
];