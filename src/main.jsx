import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LayoutPanel from "./pages/Layouts/LayoutPanel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Panel from "./pages/Panel";

const router = createBrowserRouter([
  {
    path: "/Panel",
    element: <LayoutPanel />,
    children: [
      {
        index: true,
        element: <Panel />,
      },
      {
        path: "AgendarCitas",
        element: <></>,
      },
      {
        path: "VerCitas",
        element: <></>,
      },
    ],
  },

  ,
  {
    path: "/",
    index: true,
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
