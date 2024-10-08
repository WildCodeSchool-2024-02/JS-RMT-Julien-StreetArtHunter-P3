import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { LoginProvider } from "./context/LoginContext";

import App from "./App";

import Admin from "./pages/Layout/Admin";
import ProtectedUser from "./pages/Layout/ProtectedUser";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Artist from "./pages/adminInterface/Artist";
import Category from "./pages/adminInterface/Category";
import StreetArt from "./pages/adminInterface/StreetArt";
import User from "./pages/adminInterface/User";
import City from "./pages/adminInterface/City";
import Seen from "./pages/adminInterface/Seen";
import Gallery from "./pages/Gallery";
import Enter from "./pages/Enter";
import Detail from "./pages/Detail";
import HunterGame from "./pages/HunterGame";
import Result from "./pages/Result";
import Register from "./pages/Register";

import NotFound from "./components/NotFound";

import connexion from "./services/connexion";

import "./App.css";

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
            }),
      },
      {
        path: "/street-arts/:id",
        element: <Detail />,
        loader: async ({ params }) => {
          try {
            const response = await connexion.get(`api/streetarts/${params.id}`);
            return response.data;
          } catch (error) {
            console.error(
              "Erreur lors de la récupération des données de StreetArt:",
              error
            );
            return null;
          }
        },
      },
      {
        path: "/gallery",
        element: <Gallery />,
      },
      {
        path: "",
        element: <ProtectedUser />,
        children: [
          {
            path: "result",
            element: <Result />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
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
  {
    path: "",
    element: <ProtectedUser />,
    children: [
      {
        path: "/hunter-game",
        element: <HunterGame />,
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
      {
        path: "seen",
        element: <Seen />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
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
