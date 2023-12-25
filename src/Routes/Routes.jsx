import {
    createBrowserRouter,
  } from "react-router-dom";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Dashboard from "../Layouts/Dashboard";
import Content from "../Dashboard/Content/Content";
import Login from "../Authentication/login";
import Signup from "../Authentication/Signup";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

  
 export  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/signup',
            element:<Signup></Signup>
        }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children:[
        {
            path:'content',
            element:<PrivateRoute><Content></Content></PrivateRoute>
        },
      ]
    },
  ]);