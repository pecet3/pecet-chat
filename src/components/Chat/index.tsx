import React from "react";
import { BsFillArrowDownCircleFill, BsList } from "react-icons/bs";
import ChatContext, { IChatContext } from "../../context/ChatContext";
import Messages from "./Messages";
import Input from "./Input";

const Chat: React.FC = () => {
  const { state, dispatch } = React.useContext(ChatContext) as IChatContext;
  const isPublic = state.isPublic;
  const isSidebar = state.isSidebar;

  const handleOnPublic = () => {
    dispatch({ type: "ACTIVATE_GO_DOWN", payload: {} });
  };
  const handleOnSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR", payload: {} });
  };
  return (
    <main
      className={`justify-between md:basis-2/3
      ${!isSidebar ? "" : "hidden flex-col md:flex"}
       ${isPublic ? "bg-zinc-400 " : "bg-slate-400 "}
       "}`}
    >
      <div
        className={`flex justify-between ${
          isPublic ? "bg-zinc-200 text-black" : "bg-slate-500 "
        } px-2 py-5 text-slate-200`}
      >
        <button className="flex sm:hidden" onClick={handleOnSidebar}>
          <BsList size="28" className="text-black" />
        </button>
        <p className={`font-bold ${isPublic ? "text-black" : "text-white"}`}>
          {isPublic ? "#" + state.room : state.user.displayName}
        </p>
        <span className="flex text-black">
          <button
            className={`mr-1 flex items-center gap-1 ${
              isPublic ? "text-black" : "text-white "
            }`}
            onClick={handleOnPublic}
          >
            <p className="text-xs">the last message</p>
            <BsFillArrowDownCircleFill size="24" />
          </button>
        </span>
      </div>

      <Messages />
      <Input />
    </main>
  );
};

export default Chat;
