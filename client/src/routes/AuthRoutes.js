import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import EmailVerificationLandingPage from "../pages/auth/EmailVerificationLandingPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import PasswordResetLandingPage from "../pages/auth/PasswordResetLandingPage";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

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
            }
        ]
    }
];