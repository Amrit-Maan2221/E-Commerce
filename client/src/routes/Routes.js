import {
    createBrowserRouter,
    Outlet
} from "react-router-dom";


import UserInfo from "../pages/UserInfo";
import PrivateRoute from "../auth/PrivateRoute";
import Test from "../pages/Test";
import { AuthRoutes } from "./AuthRoutes";



const router = createBrowserRouter([

    {
        path: "/",
        element: <PrivateRoute><UserInfo /></PrivateRoute>,
    },
    ...AuthRoutes
    ,
    {
        path: "/test",
        element: <Test />,
    }
]);

export default router