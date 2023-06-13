import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import UserChats from "./UserChats";
import PublicRooms from "./PublicRooms";

import ChatContext, { IChatContext } from "../../context/ChatContext";

const Sidebar: React.FC = ({}) => {
  const { state } = React.useContext(ChatContext) as IChatContext;

  const isSidebar = state.isSidebar;

  return (
    <aside
      className={` bg-slate-500 ${
        isSidebar ? "" : "hidden md:block"
      } md:basis-1/3`}
    >
      <Navbar />
      <PublicRooms />
      <Search />
      <UserChats />
    </aside>
  );
};

export default Sidebar;
