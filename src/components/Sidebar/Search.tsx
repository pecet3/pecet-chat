import React from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  DocumentData,
  updateDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import AuthContext, { IAuthContext } from "../../context/AuthContext";

const Search: React.FC = () => {
  const [input, setInput] = React.useState("");
  const [findedUser, setFindedUser] = React.useState<DocumentData | null>(null);
  const { user } = React.useContext(AuthContext) as IAuthContext;

  const handleSearch = async () => {
    if (input === user?.displayName) return;
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
    if (e.code === "Enter") {
      handleSearch();
    }
  };

  const handleSelect = async () => {
    if (user === null || findedUser === null) return;
    setInput("");

    const combinedId =
      user.uid > findedUser.uid
        ? user.uid + findedUser.uid
        : findedUser.uid + user.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));
      if (!response.exists()) {
        setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: findedUser.uid,
            displayName: findedUser.displayName,
            photoURL: findedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", findedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      alert(err);
    }
    setFindedUser(null);
  };

  return (
    <>
      <div className="flex flex-col border-b border-b-gray-400 bg-cyan-600 ">
        <input
          type="text"
          placeholder="Find a user 🔎"
          className="w-full bg-transparent p-1 pl-2 text-slate-50 placeholder-gray-100"
          onChange={(e) => setInput(e.currentTarget.value)}
          value={input}
          onKeyDown={handleKey}
        />
        {findedUser && (
          <div
            className="flex items-center gap-1 bg-slate-500 py-1 text-left duration-200 hover:bg-slate-600"
            onClick={handleSelect}
          >
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
