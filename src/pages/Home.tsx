import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import ChatContext, { IChatContext } from "../context//ChatContext";

const Home: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;
  const isSidebar = state.isSidebar;
  return (
    <main className="flex h-[560px] max-h-full justify-center overflow-hidden rounded-xl shadow-xl shadow-slate-400 md:h-[700px]">
      {isSidebar && <Sidebar />}
      <Chat />
    </main>
  );
};

export default Home;
