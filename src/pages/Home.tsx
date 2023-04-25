import React from "react";
import Chat from ".././components/Chat";
import Sidebar from ".././components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="m-auto flex h-[500px] max-w-[768px] justify-center gap-2 border-2 border-black bg-slate-500">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
