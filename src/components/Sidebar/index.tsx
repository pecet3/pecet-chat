import React from "react";
import Navbar from "./Navbar";
import Search from "./Search";
import UserChats from "./UserChats";
import PublicRooms from "./PublicRooms";
const Sidebar: React.FC = () => {
  return (
    <div className="basis-1/3 bg-slate-500">
      <Navbar />
      <Search />
      <UserChats />
      <PublicRooms />
    </div>
  );
};

export default Sidebar;
