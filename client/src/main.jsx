import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginProvider } from "./context/LoginContext";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Artist from "./pages/adminInterface/Artist";
import Category from "./pages/adminInterface/Category";
import StreetArt from "./pages/adminInterface/StreetArt";
import User from "./pages/adminInterface/User";
import City from "./pages/adminInterface/City";
import Admin from "./pages/Layout/Admin";
import Gallery from "./pages/Gallery";
import App from "./App";
import Enter from "./pages/Enter";
import Detail from "./pages/Detail";

import connexion from "./services/connexion";

import "./App.css";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Enter />,
      },
      {
        path: "/street-arts",
        element: <Home />,
        loader: () =>
          connexion
            .get("api/streetarts")
            .then((response) => response.data)
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des données de StreetArt:",
                error
              );
              return [];
            }),
      },
      {
        path: "/street-arts/:id",
        element: <Detail />,
        loader: async ({ params }) =>
          connexion
            .get(`api/streetarts/${params.id}`)
            .then((response) => response.data)
            .catch((error) => {
              console.error(
                "Erreur lors de la récupération des données de StreetArt:",
                error
              );
              return [];
            }),
      },
      {
        path: "/gallery",
        element: <Gallery />,
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
      {
        path: "cities",
        element: <City />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
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
