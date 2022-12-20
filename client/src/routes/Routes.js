import {
    createBrowserRouter,
    Outlet
} from "react-router-dom";


import UserInfo from "../pages/UserInfo";
import PrivateRoute from "../auth/PrivateRoute";
import Test from "../pages/Test";
import { AuthRoutes } from "./AuthRoutes";
import Homepage from "../pages/Homepage";



const router = createBrowserRouter([

    {
        path: "/",
        element: <Homepage/>,
    },
    ...AuthRoutes
    ,
    {
        path: "/test",
        element: <Test />,
    }
]);

export default router