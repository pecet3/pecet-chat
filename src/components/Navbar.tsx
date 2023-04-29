import React from "react";
import Context, { IContext } from "../ChatContext";

const Navbar: React.FC = () => {
  const { user } = React.useContext(Context) as IContext;
  return (
    <>
      <nav className="flex flex-col bg-slate-700 p-2 text-gray-200">
        <h1 className="font-bold ">JakubChat</h1>
        <span className="flex justify-between">
          <span className="flex gap-1">
            <img
              src={user?.photoURL ? user?.photoURL : ""}
              className="h-6 w-6 rounded-full"
            />
            <p>{user?.displayName ? user.displayName : ""}</p>
          </span>

          <button className=" rounded-md bg-slate-300 px-1 text-xs text-slate-900">
            Log Out
          </button>
        </span>
      </nav>
    </>
  );
};

export default Navbar;
