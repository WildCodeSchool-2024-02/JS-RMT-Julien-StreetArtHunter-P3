import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Artist from "./pages/admin/Artist";
import Category from "./pages/admin/Category";
import StreetArt from "./pages/admin/StreetArt";
import User from "./pages/admin/User";
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
    path: "/login",
    element: <Login />,
  },
  {
    path: "/admin",
    element: <admin />,
    children: [
      {
        path: "/Users",
        element: <User />,
      },
      {
        path: "/Artists",
        element: <Artist />,
      },
      {
        path: "/Categories",
        element: <Category />,
      },
      {
        path: "/StreetArts",
        element: <StreetArt />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
