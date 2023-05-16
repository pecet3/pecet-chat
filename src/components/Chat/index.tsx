import React from "react";
import { BsFillArrowDownCircleFill, BsList } from "react-icons/bs";
import ChatContext, { IChatContext } from "../../context/ChatContext";
import Messages from "./Messages";
import Input from "./Input";

const Chat: React.FC = () => {
  const { state, dispatch } = React.useContext(ChatContext) as IChatContext;

  const handleOnClick = () => {
    dispatch({ type: "ACTIVATE_GO_DOWN", payload: {} });
  };
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
        <button>
          <BsList size="28" className="text-black" />
        </button>
        <p
          className={`font-bold ${
            state.isPublic ? "text-black" : "text-white"
          }`}
        >
          {state.isPublic ? "#" + state.room : state.user.displayName}
        </p>
        <span className="flex text-black">
          <button
            className={`flex items-center gap-1 ${
              state.isPublic ? "text-black" : "text-white "
            }`}
            onClick={handleOnClick}
          >
            <p className="text-xs">the last message</p>
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
