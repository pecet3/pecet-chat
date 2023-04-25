import React from "react";
import Message from "./Message";

const Messages: React.FC = () => {
  return (
    <div className="flex h-[calc(100%-104px)] flex-col p-1">
      <Message /> <Message /> <Message /> <Message />
    </div>
  );
};

export default Messages;
