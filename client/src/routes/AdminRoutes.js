import { Outlet } from "react-router-dom";
import AdminPage from "../components/admin/AdminPage";
import ProductList from "../components/admin/ProductList";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/TopBar";
import UserList from "../components/admin/UserList";
import PrivateRoute from "../components/auth/PrivateRoute";
import Product from "../components/admin/Product";

const AdminLayout = () => {
    return (
        <>
                <Topbar/>
                <div className="admin-container">
                    <Sidebar/>
                    <Outlet />
                </div>
        </>
    );
};


export const AdminRoutes = [
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                path: "/admin",
                element: <AdminPage />
            },
            {
                path: "/admin/users",
                element: <UserList />
            },
            {
                path: "/admin/products",
                element: <ProductList />
            },
            {
                path: "/admin/product/:id",
                element: <Product />,
            },

        ]
    }
];