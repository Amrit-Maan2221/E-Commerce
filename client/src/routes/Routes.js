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
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import PasswordResetLandingPage from "../pages/auth/PasswordResetLandingPage";



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
    },
    {
        path: "/forgot-password",
        element: <ForgotPasswordPage />,
    },
    {
        path: "/reset-password/:passwordResetCode",
        element: <PasswordResetLandingPage />,
    }
]);

export default router