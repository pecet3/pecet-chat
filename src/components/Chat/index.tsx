import React from "react";
import { BsFillArrowDownCircleFill } from "react-icons/bs";
import ChatContext, { IChatContext } from "../../context/ChatContext";
import Messages from "./Messages";
import Input from "./Input";

const Chat: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;

  return (
    <div
      className={`basis-2/3 flex-col justify-between ${
        state.isPublic ? "bg-zinc-400 " : "bg-slate-400 "
      }`}
    >
      <div
        className={`flex justify-between ${
          state.isPublic ? "bg-zinc-200 text-black" : "bg-slate-500 "
        } px-2 py-5 text-slate-200`}
      >
        <p
          className={`font-bold ${
            state.isPublic ? "text-black" : "text-white"
          }`}
        >
          {state.isPublic ? "#" + state.room : state.user.displayName}
        </p>
        <span className="flex gap-2 text-black">
          <button>
            <BsFillArrowDownCircleFill size="24" />
          </button>
        </span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
