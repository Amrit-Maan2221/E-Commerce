import { Outlet } from "react-router-dom";
import AdminPage from "../components/admin/AdminPage";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/TopBar";
import UserList from "../components/admin/UserList";
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
                element: <AdminPage />
            },
            {
                path: "/admin/users",
                element: <UserList />
            }
        ]
    }
];