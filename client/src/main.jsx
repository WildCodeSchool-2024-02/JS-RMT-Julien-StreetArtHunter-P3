import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginProvider } from "./context/LoginContext";

import Admin from "./pages/Layout/Admin";


import "./App.css";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Artist from "./pages/admin/Artist";
import Category from "./pages/admin/Category";
import StreetArt from "./pages/admin/StreetArt";
import User from "./pages/admin/User";
import Admin from "./pages/Layout/Admin";
import Gallery from "./pages/Gallery";
import App from "./App";

import "./App.css";

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
    children: [
      {
        path: "users",
        element: <User />,
      },
      {
        path: "artists",
        element: <Artist />,
      },
      {
        path: "categories",
        element: <Category />,
      },
      {
        path: "streetarts",
        element: <StreetArt />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/gallery",
    element: <Gallery />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <LoginProvider>
      <RouterProvider router={router} />
    </LoginProvider>
  </React.StrictMode>
);
