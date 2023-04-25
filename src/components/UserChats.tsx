import React from "react";

const UserChats: React.FC = () => {
  return (
    <div className="flex items-center gap-1 border-2  text-left hover:bg-slate-400">
      <img
        src="https://d-art.ppstatic.pl/kadry/k/r/1/57/8f/6290b1787d225_o_large.jpg"
        className="h-10 w-10 rounded-full object-cover"
      />
      <span>
        <p className="font-bold text-slate-200 ">Agnieszka</p>
        <p>Lorem ipsum dolor sit.</p>
      </span>
    </div>
  );
};

export default UserChats;
