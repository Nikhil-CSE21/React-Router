import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./page/HomePage";
import Event from "./page/Events";
import EventDetails from "./page/EventDetails";
import AddEvent, { actions as NewEventAction } from "./page/NewEventPage";
import EditEvent from "./page/EditEvent";
import RootLayout from "./page/Rootlayout";
import EventRoot from "./page/EventRoot";

import { loader } from "./page/Events";
import ErrorPage from "./page/ErrorPage";
import {
  Get_Event_Details,
  actions as deleteAction,
} from "./page/EventDetails";
import NewsLetter, { action as NewsLetterAction } from "./page/NewsLetterPage";
import AuthenticationPage, {
  action as authAction,
} from "./page/Authenticationpage";

import { action as Logout } from "./page/Logout";
import { tokenLoader, checkLoader } from "./page/utils";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/newsletter",
        element: <NewsLetter />,
        action: NewsLetterAction,
      },

      {
        path: "/auth",
        element: <AuthenticationPage />,
        action: authAction,
      },

      {
        path: "/logout",
        action: Logout,
      },

      {
        path: "/events",
        element: <EventRoot />,
        children: [
          {
            index: true,
            element: <Event />,
            loader: loader,
            //errorElement: <ErrorPage />,
          },
          // {
          //   path: ":id",
          //   element: <EventDetails />,
          //   loader: Get_Event_Details,
          // },
          {
            path: "new",
            element: <AddEvent />,
            action: NewEventAction,
            loader: checkLoader,
          },

          {
            path: ":id",
            id: "event-details",
            errorElement: <ErrorPage />,
            loader: Get_Event_Details, // accessible to both children

            children: [
              {
                index: true,
                element: <EventDetails />,
                action: deleteAction,
              },
              {
                path: "edit",
                element: <EditEvent />,
                action: NewEventAction,
                loader: checkLoader,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
