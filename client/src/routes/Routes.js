import {
    createBrowserRouter,
    Outlet
} from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import UserInfo from "../pages/UserInfo";
import PrivateRoute from "../auth/PrivateRoute";
import VerifyEmailPage from "../pages/VerifyEmailPage";


const router = createBrowserRouter([

    {
        path: "/",
        element: <PrivateRoute><UserInfo /></PrivateRoute>,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/verify-email",
        element: <VerifyEmailPage/>,
    }
]);

export default router