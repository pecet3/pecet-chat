import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="m-auto flex h-[700px] max-w-[1000px] justify-center overflow-hidden rounded-xl shadow-xl shadow-slate-400">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
