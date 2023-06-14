import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import ChatContext, { IChatContext } from "../context//ChatContext";

const Home: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;
  const isSidebar = state.isSidebar;
  return (
    <main className="m-auto flex h-[700px] max-h-full w-auto max-w-6xl justify-center overflow-hidden rounded-xl shadow-xl shadow-slate-400">
      {isSidebar && <Sidebar />}
      <Chat />
    </main>
  );
};

export default Home;
