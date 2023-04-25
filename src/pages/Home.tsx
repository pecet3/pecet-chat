import React from "react";
import Chat from ".././components/Chat";
import Sidebar from ".././components/Sidebar";

const Home: React.FC = () => {
  return (
    <div className="m-auto flex h-[500px] max-w-[768px] justify-center overflow-hidden rounded-xl">
      <Sidebar />
      <Chat />
    </div>
  );
};

export default Home;
