import { Outlet } from "react-router-dom";
import AdminPage from "../components/admin/AdminPage";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/TopBar";
import PrivateRoute from "../components/auth/PrivateRoute";

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
                element: <AdminPage />,
            }
        ]
    }
];