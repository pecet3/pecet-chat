import React from "react";

const Search: React.FC = () => {
  return (
    <div className="flex border-b border-b-gray-400 bg-cyan-600 ">
      <input
        type="text"
        placeholder="Find a user 🔎"
        className="w-full bg-transparent p-1 pl-2 text-slate-50 placeholder-gray-100"
      />
    </div>
  );
};

export default Search;
