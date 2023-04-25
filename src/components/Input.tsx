import React from "react";

const Input: React.FC = () => {
  return (
    <div className="flex ">
      <input
        type="text"
        placeholder="enter your message"
        className="w-full p-2"
      />
    </div>
  );
};

export default Input;
