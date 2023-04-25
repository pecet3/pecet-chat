import React from "react";

const Search: React.FC = () => {
  return (
    <div className="flex bg-gray-600 text-slate-200">
      <input
        type="text"
        placeholder="Find a user 🔎"
        className="w-full bg-transparent p-1 pl-2"
      />
    </div>
  );
};

export default Search;
