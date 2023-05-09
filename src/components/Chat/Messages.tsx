import React from "react";
import Message from "./Message";
import MessagePublic from "./MessagePublic";
import { onSnapshot, doc, DocumentData } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ChatContext, { IChatContext } from "../../context/ChatContext";

const Messages: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;
  const [messages, setMessages] = React.useState<DocumentData | null>([]);
  const [publicMessages, setPublicMessages] =
    React.useState<DocumentData | null>([]);
  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", state.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unsub();
  }, [state.chatId]);

  React.useEffect(() => {
    const unsub = onSnapshot(doc(db, "publicChats", state.room), (doc) => {
      doc.exists() && setPublicMessages(doc.data().messages);
    });

    return () => unsub();
  }, [state.room]);

  return (
    <div className="flex h-[calc(100%-112px)] flex-col gap-1 overflow-y-scroll p-1">
      {!state.isPublic
        ? messages?.map((message: DocumentData) => (
            <Message message={message} key={message.id} />
          ))
        : publicMessages?.map((message: DocumentData) => (
            <MessagePublic message={message} key={message.id} />
          ))}
    </div>
  );
};

export default Messages;
