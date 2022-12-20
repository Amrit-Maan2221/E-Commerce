export const ECommerceRoutes = [
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
];