import { createBrowserRouter } from "react-router-dom";

import SignIn from "./pages/auth/sign-in";
import SignUp from "./pages/auth/sign-up";
import AuthLayout from "./pages/layouts/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <SignUp /> },
    ],
  },
]);
