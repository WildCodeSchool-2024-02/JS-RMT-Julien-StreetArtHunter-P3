import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginProvider } from "./context/LoginContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Artist from "./pages/admin/Artist";
import Category from "./pages/admin/Category";
import StreetArt from "./pages/admin/StreetArt";
import User from "./pages/admin/User";
import Admin from "./pages/Layout/Admin";
import Gallery from "./pages/Gallery";
import App from "./App";

import connexion from "./services/connexion";

import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
        loader: () => connexion
          .get("api/streetarts")
          .then((response) => response.data)
          .catch((error) => {
            console.error(
              "Erreur lors de la récupération des données de StreetArt:",
              error
            );
            return []
          })
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
