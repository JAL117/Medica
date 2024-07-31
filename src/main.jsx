import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import LayoutPanel from "./pages/Layouts/LayoutPanel";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Panel from "./pages/Panel";
import Citas from "./pages/Citas"
import VerCitas from "./pages/VerCitas";
import RegistroDeAsistente from "./pages/RegistroDeAsistente";
import HistorialDeCitas from "./pages/HistorialDeCitas";
import ReportesClinicos from "./pages/ReportesClinicos";



const router = createBrowserRouter([
  {
    path: "/Panel",
    element: <LayoutPanel />,
    children: [
      {
        index: true,
        element: <Panel/>,
      },
      {
        path: "AgendarCitas",
        element:<Citas/>,
      },
      {
        path: "VerCitas",
        element:<VerCitas/>,
      },
      {
        path:"RegistroDeAsistente",
        element:<RegistroDeAsistente/>
      },
      {
        path:"HistorialDeCitas",
        element:<HistorialDeCitas/>
      },
      {
        path:"ReporteClinico",
        element:<ReportesClinicos/>
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
  }

]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
