import React from "react";

const Search: React.FC = () => {
  return (
    <div className="flex border-b border-b-gray-400 text-slate-200">
      <input
        type="text"
        placeholder="Find a user 🔎"
        className="w-full bg-transparent p-1 pl-2"
      />
    </div>
  );
};

export default Search;
