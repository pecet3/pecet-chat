import React from "react";
import Navbar from "./Navbar";

const Sidebar: React.FC = () => {
  return (
    <div className="basis-1/3 border-r-2 bg-slate-500">
      <Navbar />
    </div>
  );
};

export default Sidebar;
