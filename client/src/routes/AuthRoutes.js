import VerifyEmailPage from "../components/auth/VerifyEmailPage";
import EmailVerificationLandingPage from "../components/auth/EmailVerificationLandingPage";
import ForgotPasswordPage from "../components/auth/ForgotPasswordPage";
import PasswordResetLandingPage from "../components/auth/PasswordResetLandingPage";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import Navbar from "../components/common/Navbar";
import { Outlet } from "react-router-dom";
import UserInfo from "../components/auth/UserInfo";
import PrivateRoute from "../components/auth/PrivateRoute";

const AuthLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
};


export const AuthRoutes = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [

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
                element: <VerifyEmailPage />,
            },
            {
                path: "/forgot-password",
                element: <ForgotPasswordPage />,
            },
            {
                path: "/reset-password/:passwordResetCode",
                element: <PasswordResetLandingPage />,
            },
            {
                path: "/profile",
                element: <PrivateRoute><UserInfo /></PrivateRoute>
            }
        ]
    }
];