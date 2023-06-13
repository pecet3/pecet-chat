import React, { useState, useEffect, useContext } from "react";
import { doc, onSnapshot, DocumentData } from "firebase/firestore";
import { db } from "../../firebase";
import AuthContext, { IAuthContext } from "../../context/AuthContext";
import ChatContext, { IChatContext } from "../../context/ChatContext";
import { useGetWidth } from "../../helpers/useGetWidth";

const UserChats: React.FC = () => {
  const [chats, setChats] = useState<DocumentData | undefined>(undefined);

  const { user } = useContext(AuthContext) as IAuthContext;
  const { dispatch } = useContext(ChatContext) as IChatContext;

  const innerWidth = useGetWidth();

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
      setChats(doc.data());
    });
    return () => unsub();
  }, [user?.uid]);

  const handleSelect = async (user: DocumentData) => {
    if (!chats) return;
    dispatch({ type: "CHANGE_USER", payload: user });
    if (innerWidth > 768) return;
    await dispatch({ type: "TOGGLE_SIDEBAR", payload: {} });
  };

  return (
    <>
      {chats &&
        Object.entries(chats)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <button
              key={chat[0]}
              className="flex items-center gap-1 py-1 text-left duration-200 hover:bg-slate-600"
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img
                src={
                  typeof chat[1].userInfo.photoURL !== undefined
                    ? chat[1].userInfo.photoURL
                    : ""
                }
                className="ml-1 h-10 w-10 rounded-full object-cover"
              />
              <span>
                <p className="font-bold text-white ">
                  {chat[1].userInfo.displayName}
                </p>
                {chat[1].lastMessage === "photo" ? (
                  <p className="text-sm italic text-slate-300">photo</p>
                ) : (
                  chat[1].lastMessage && (
                    <p className="w-64 truncate text-sm italic text-slate-300">
                      {chat[1].lastMessage}
                    </p>
                  )
                )}
              </span>
            </button>
          ))}
    </>
  );
};

export default UserChats;
