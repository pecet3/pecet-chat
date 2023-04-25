import React from "react";

const Search: React.FC = () => {
  return (
    <div className="flex text-slate-200">
      <input type="text" placeholder="Find a user" className="bg-transparent" />
    </div>
  );
};

export default Search;
