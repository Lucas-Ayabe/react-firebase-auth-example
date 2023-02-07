import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { Menu } from "./components";

import { RootPage } from "./routes/root";
import { LoginPage } from "./routes/login";
import { AdminPage } from "./routes/admin";

import "./index.css";
import { AuthContextProvider } from "./features/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: (
      <div className="container flow">
        <Menu />
        <h1>404 Page Not Found</h1>
      </div>
    ),
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
