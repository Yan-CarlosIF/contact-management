import { createBrowserRouter } from "react-router-dom";

import Dashboard from "./pages/app/dashboard";
import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import AppLayout from "./pages/layouts/app";
import AuthLayout from "./pages/layouts/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "/", element: <SignIn /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [{ path: "/home", element: <Dashboard /> }],
  },
]);
