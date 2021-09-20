import { Navigate } from "react-router-dom";
import { Layout } from "./components/layout";
import { NotFound } from "./pages/not-found";
import { Home } from "./pages/Home";
import { Category } from "./pages/Category";
import { Book } from "./pages/Book";

export const routes = [
  {
    path: "/",
    element: <Navigate to="/dashboard" />,
  },
  {
    path: "dashboard",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },

      {
        path: "settings",
        element: <Category />,
      },
      {
        path: "theme",
        element: <Book />,
      },

      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
  },
  {
    path: "404",
    element: <NotFound />,
  },
];
