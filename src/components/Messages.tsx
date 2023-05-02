import React from "react";
import Message from "./Message";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ChatContext, { IChatContext } from "../context/ChatContext";

const Messages: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;
  const [messages, setMessages] = React.useState([]);
  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      if (!doc.exists()) return;
      setMessages(doc.data().messages);
    });

    return () => unsub();
  }, []);
  return (
    <div className="flex h-[calc(100%-112px)] flex-col gap-1 overflow-y-scroll p-1">
      <Message />
    </div>
  );
};

export default Messages;
