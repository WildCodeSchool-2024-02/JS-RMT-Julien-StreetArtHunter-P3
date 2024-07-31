import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import User from "./components/User";

import "./App.css";

import Admin from "./pages/Admin";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },

  {
    path: "/admin/",
    element: <Admin />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
  {
    path: "/admin/users",
    element: <User />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
