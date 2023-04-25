import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChatContextProvider } from "./ChatContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </React.StrictMode>
);
