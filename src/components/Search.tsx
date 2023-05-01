import React from "react";
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const Search: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [findedUser, setFindedUser] = React.useState<DocumentData | null>(null);

  React.useEffect(() => {
    console.log(findedUser?.displayName);
  }, [findedUser]);

  const handleSearch = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", input)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setFindedUser(doc.data());
      });
    } catch (err) {
      alert(err);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <>
      <div className="flex flex-col border-b border-b-gray-400 bg-cyan-600 ">
        <input
          type="text"
          placeholder="Find a user 🔎"
          className="w-full bg-transparent p-1 pl-2 text-slate-50 placeholder-gray-100"
          onChange={(e) => setInput(e.currentTarget.value)}
          onKeyDown={handleKey}
        />
        {findedUser && (
          <div className="flex items-center gap-1 bg-slate-500 py-1 text-left duration-200 hover:bg-slate-600">
            <img
              src={findedUser.photoURL}
              className="ml-1 h-10 w-10 rounded-full object-cover"
            />
            <span>
              <p className="font-bold text-slate-200 ">
                {findedUser.displayName}
              </p>
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
