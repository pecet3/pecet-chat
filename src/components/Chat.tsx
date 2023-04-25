import React from "react";
import { BsCameraVideo, BsThreeDots, BsPersonAdd } from "react-icons/bs";
import Messages from "./Messages";
import Input from "./Input";

const Chat: React.FC = () => {
  return (
    <div className="basis-2/3 flex-col justify-between bg-slate-400">
      <div className="flex justify-between bg-slate-500 px-2 py-5 text-slate-200">
        <p>Friend's Name</p>
        <span className="flex gap-2">
          <BsCameraVideo size="24" />
          <BsThreeDots size="24" />
          <BsPersonAdd size="24" />
        </span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
