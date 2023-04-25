import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <nav className="flex flex-col bg-slate-700 p-2 text-gray-200">
        <h1 className="font-bold ">JakubChat</h1>
        <span className="flex justify-between">
          <span className="flex gap-1">
            <img
              src="https://scontent-prg1-1.xx.fbcdn.net/v/t39.30808-6/342983146_611869417529412_5788840550914142154_n.jpg?stp=dst-jpg_p526x296&_nc_cat=111&ccb=1-7&_nc_sid=730e14&_nc_ohc=TOGhmaPmYJoAX8OqXuK&_nc_ht=scontent-prg1-1.xx&oh=00_AfAiZ7_chTvohjG3-Bv4S3FaVKe84uXJzYsCirbhA4HK0A&oe=644BD945"
              className="h-6 w-6 rounded-full"
            />
            Jakub
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
