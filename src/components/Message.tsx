import React from "react";
import ChatContext, { IChatContext } from "../context/ChatContext";
import AuthContext, { IAuthContext } from "../context/AuthContext";
import { DocumentData } from "firebase/firestore";

interface IMessage {
  message: DocumentData;
}

const Message: React.FC<IMessage> = ({ message }) => {
  const [date, setDate] = React.useState("");

  const { state } = React.useContext(ChatContext) as IChatContext;
  const { user } = React.useContext(AuthContext) as IAuthContext;
  const messageRef = React.useRef<HTMLDivElement | null>(null);

  const [currentDate, setCurrentDate] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(parseInt((Date.now() / 1000).toFixed()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
    const date = new Date(message.date.seconds * 1000);
    setDate(
      date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      })
    );
  }, [message]);

  return (
    <div
      ref={messageRef}
      className={`flex ${
        user?.uid === message.senderId && "flex-row-reverse"
      } gap-1 text-slate-200`}
    >
      <span>
        <img
          src={
            user?.uid === message.senderId
              ? user?.photoURL?.toString()
              : state.user.photoURL || ""
          }
          alt="user's image"
          className="m-auto h-8 w-8 rounded-full object-cover"
        />
        <p className="max-w-[60px] break-words text-xs">
          {message.date.seconds > currentDate - 60 ? "Just Now" : date}
        </p>
      </span>
      <span className="flex flex-col gap-1">
        {message && message.text !== "" && (
          <p
            className={`flex flex-col justify-center rounded-b-lg ${
              user?.uid === message.senderId ? "rounded-l-lg" : "rounded-r-lg"
            } bg-zinc-600 p-1 px-2 text-${
              user?.uid === message.senderId ? "left" : "right"
            } `}
          >
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
};

export default Message;
