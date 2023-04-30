import React from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const Search: React.FC = () => {
  const [input, setInput] = React.useState("");

  React.useEffect(() => {
    console.log(input);
  }, [input]);

  const handleSearch = () => {
    const q = query(collection(db, "users"), where("displayName", "==", input))
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className="flex border-b border-b-gray-400 bg-cyan-600 ">
      <input
        type="text"
        placeholder="Find a user 🔎"
        className="w-full bg-transparent p-1 pl-2 text-slate-50 placeholder-gray-100"
        onChange={(e) => setInput(e.currentTarget.value)}
        onKeyDown={handleKey}
      />
    </div>
  );
};

export default Search;
