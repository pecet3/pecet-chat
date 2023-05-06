import React from "react";
import ChatContext, { IChatContext } from "../context/ChatContext";
import AuthContext, { IAuthContext } from "../context/AuthContext";
import { DocumentData } from "firebase/firestore";

interface IMessage {
  message: DocumentData;
}

const Message: React.FC<IMessage> = ({ message }) => {
  const { state } = React.useContext(ChatContext) as IChatContext;
  const { user } = React.useContext(AuthContext) as IAuthContext;
  const messageRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  if (user?.uid === message.senderId) {
    return (
      <div
        ref={messageRef}
        className="flex flex-row-reverse gap-1 text-slate-200"
      >
        <span>
          <img
            src={user?.photoURL || ""}
            alt="user's image"
            className="m-auto h-8 w-8 rounded-full object-cover"
          />
          <p>Just now</p>
        </span>
        <span className="flex flex-col gap-1">
          {message && message.text !== "" && (
            <p className="flex flex-col justify-center rounded-b-lg rounded-l-lg bg-zinc-600 p-1 px-2 text-right ">
              {message.text}
            </p>
          )}

          {message.img && (
            <img
              src={message.img || ""}
              alt="photo which user sent"
              className="max-h-48 self-start rounded-sm"
            />
          )}
        </span>
      </div>
    );
  } else {
    return (
      <div ref={messageRef} className="flex gap-1 text-slate-200">
        <span>
          <img
            src={state.user.photoURL || ""}
            alt="user's image"
            className="m-auto h-8 w-8 rounded-full object-cover"
          />
          <p>Just now</p>
        </span>
        <span className="flex flex-col gap-1">
          {message && message.text !== "" && (
            <p className="flex flex-col justify-center rounded-b-lg rounded-r-lg bg-slate-600 p-1 px-2 text-left">
              {message.text}
            </p>
          )}

          {message.img && (
            <img
              src={message.img || ""}
              alt="photo which user sent"
              className="max-h-48 self-start rounded-sm"
            />
          )}
        </span>
      </div>
    );
  }
};

export default Message;
