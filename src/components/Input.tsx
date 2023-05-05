import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";

const Input: React.FC = () => {
  const [input, setInput] = React.useState({
    message: "",
    file: null,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventElement = e.target as HTMLInputElement;
  };
  return (
    <form className=" flex gap-1 bg-gray-300 p-1">
      <input
        type="text"
        placeholder="enter your message"
        className="w-full rounded-md p-1 text-left"
        value={input.message}
        onChange={changeHandler}
      />
      <span className="flex items-center">
        <BiImageAdd size="28" />
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={changeHandler}
        />
        <label htmlFor="file">
          <MdAttachFile size="28" />
        </label>
      </span>
      <button className="submitButton">Send</button>
    </form>
  );
};

export default Input;
