import React from "react";
import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Context, { IContext } from "./AuthContext";

interface IProtectedRoute {
  children: React.ReactNode;
}

type TProtectedRouteReturn = React.ReactElement | null;

const ProtectedRoute: React.FC<IProtectedRoute> = ({
  children,
}): TProtectedRouteReturn => {
  const { user } = React.useContext(Context) as IContext;
  if (!user) return <Navigate to="/login" replace />;
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
