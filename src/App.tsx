import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatContextProvider } from "./ChatContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ChatContextProvider>
        <Home />
      </ChatContextProvider>
    ),
  },
  {
    path: "register",
    element: (
      <ChatContextProvider>
        <Register />
      </ChatContextProvider>
    ),
  },
  {
    path: "login",
    element: (
      <ChatContextProvider>
        <Login />
      </ChatContextProvider>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
