import React from "react";
import AuthContext, { IAuthContext } from "../../context/AuthContext";
import ChatContext, { IChatContext } from "../../context/ChatContext";
import { DocumentData } from "firebase/firestore";

interface IMessage {
  message: DocumentData;
}
const MessagePublic: React.FC<IMessage> = ({ message }) => {
  const [date, setDate] = React.useState({
    date: "",
    time: "",
  });

  const { user } = React.useContext(AuthContext) as IAuthContext;
  const { state } = React.useContext(ChatContext) as IChatContext;
  const messageRef = React.useRef<HTMLDivElement | null>(null);

  const [currentDate, setCurrentDate] = React.useState<number>(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(parseInt((Date.now() / 1000).toFixed()));
    }, 1000);

    return () => clearInterval(interval);
  }, [message]);

  React.useEffect(() => {
    setTimeout(() => {
      messageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, []);

  React.useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
    const date = new Date(message.date.seconds * 1000);
    setDate({
      date: date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
      time: date.toLocaleDateString(undefined, {
        hour: "numeric",
        minute: "numeric",
      }),
    });
  }, [message, state.goDown]);

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
              : message.photoURL || ""
          }
          alt="user's image"
          className="m-auto h-8 w-8 rounded-full object-cover"
        />
        <p
          className={`mx-2 break-words text-xs font-semibold text-gray-800 ${
            message.color && "text-" + message.color
          } `}
        >
          {message.displayName}
        </p>
      </span>
      <span className="flex max-w-[300px] flex-col gap-1 md:max-w-md">
        {message && message.text !== "" && (
          <p
            className={`flex] flex-col justify-end break-words rounded-b-lg ${
              message.color ? "bg-" + message.color : "bg-indigo-600"
            } ${
              user?.uid === message.senderId
                ? "ml-[54px] items-end rounded-l-lg text-right"
                : "mr-[54px] items-start rounded-r-lg  text-left"
            } p-1 px-2 
            ${message.color === "white" && "text-black"}`}
          >
            {message.text}
          </p>
        )}

        {message.img && (
          <a href={message.img} target="_blank" rel="noopener noreferrer">
            <img
              src={message.img || ""}
              alt="photo which user sent"
              className="max-h-36 self-start rounded-sm"
            />
          </a>
        )}
        <p
          className={`m-0 ${
            user?.uid === message.senderId ? "self-end" : "self-start"
          } mb-1 p-0 text-[10px] italic text-zinc-200`}
        >
          {message.date.seconds > currentDate - 30
            ? "Just Now"
            : date.date + date.time.slice(10)}
        </p>
      </span>
    </div>
  );
};

export default MessagePublic;
