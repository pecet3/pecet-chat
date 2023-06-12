import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import UserChats from "./UserChats";
import PublicRooms from "./PublicRooms";
import ChatContext, { IChatContext } from "../../context/ChatContext";

const Sidebar: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;

  const isSidebar = state.isSidebar;
  return (
    <div className="basis-1/3 bg-slate-500">
      <Navbar />
      <PublicRooms />
      <Search />
      <UserChats />
    </div>
  );
};

export default Sidebar;
