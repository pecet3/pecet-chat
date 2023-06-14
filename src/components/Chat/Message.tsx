import React from "react";
import ChatContext, { IChatContext } from "../../context/ChatContext";
import AuthContext, { IAuthContext } from "../../context/AuthContext";
import { DocumentData } from "firebase/firestore";

interface IMessage {
  message: DocumentData;
}
const Message: React.FC<IMessage> = ({ message }) => {
  const [date, setDate] = React.useState({
    date: "",
    time: "",
  });

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
              : state.user.photoURL || ""
          }
          alt="user's image"
          className="m-auto h-8 w-8 rounded-full object-cover"
        />
        <p className="w-[54px] break-words text-[10px]">
          {message.date.seconds > currentDate - 300
            ? "Just Now"
            : date.date + date.time.slice(10)}
        </p>
      </span>
      <span className="flex max-w-[300px] flex-col gap-1 md:max-w-md">
        {message && message.text !== "" && (
          <p
            className={`flex flex-col justify-center break-words rounded-b-lg ${
              user?.uid === message.senderId
                ? "ml-[54px] rounded-l-lg bg-indigo-600 text-left"
                : "mr-[54px] rounded-r-lg bg-indigo-500 text-right"
            }   p-1  px-2 `}
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
