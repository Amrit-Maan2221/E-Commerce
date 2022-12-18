import {
    createBrowserRouter,
    Outlet
} from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import UserInfo from "../pages/UserInfo";
import PrivateRoute from "../auth/PrivateRoute";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import EmailVerificationLandingPage from "../pages/auth/EmailVerificationLandingPage";



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
        path: "/verify-email/:verificationString",
        element: <EmailVerificationLandingPage />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/verify-your-email",
        element: <VerifyEmailPage/>,
    }
]);

export default router