import React from "react";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Context, { IAuthContext } from "./context/AuthContext";

interface IProtectedRoute {
  children: React.ReactNode;
}

type TProtectedRouteReturn = React.ReactElement | null;

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
}): TProtectedRouteReturn => {
  const { user } = React.useContext(Context) as IAuthContext;
  if (!user && !cookies.get("auth-token"))
    return <Navigate to="/login" replace />;
  return children as React.ReactElement;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
