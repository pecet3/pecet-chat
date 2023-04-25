import React from "react";
import Message from "./Message";

const Messages: React.FC = () => {
  return (
    <div className="flex h-[calc(100%-112px)] flex-col gap-1 overflow-y-scroll p-1">
      <Message /> <Message /> <Message /> <Message />
    </div>
  );
};

export default Messages;
