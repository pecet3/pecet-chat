import React from "react";
import Message from "./Message";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ChatContext, { IChatContext } from "../context/ChatContext";

const Messages: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;
  const [messages, setMessages] = React.useState<DocumentData | null>(null);
  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data());
    });

    return () => unsub();
  }, [state.chatId]);

  React.useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <div className="flex h-[calc(100%-112px)] flex-col gap-1 overflow-y-scroll p-1"></div>
  );
};

export default Messages;
