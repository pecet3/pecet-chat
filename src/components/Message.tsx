import React from "react";
import ChatContext, { IChatContext } from "../context/ChatContext";
import { DocumentData } from "firebase/firestore";

interface IMessage {
  message: DocumentData;
}

const Message: React.FC<IMessage> = ({ message }) => {
  const { state } = React.useContext(ChatContext) as IChatContext;

  return (
    <div className="flex gap-1 text-slate-200">
      <span>
        <img
          src={state.user && state.user.photoURL}
          alt="user image"
          className="m-auto h-8 w-8 rounded-full object-fill"
        />
        <p>Just now</p>
      </span>
      <span className="flex flex-col gap-1">
        <p className="flex flex-col justify-center rounded-b-lg rounded-r-lg bg-slate-600 p-1 text-left">
          {message && message.text}
        </p>
        {message.img && (
          <img
            src={message.img ? message.img : ""}
            alt="photo which user sent"
            className="max-h-48 self-start rounded-sm"
          />
        )}
      </span>
    </div>
  );
};

export default Message;
