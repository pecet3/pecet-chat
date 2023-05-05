import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";

export type TInput = {
  message: string;
  file: null | File;
};

const Input: React.FC = () => {
  const [input, setInput] = React.useState<TInput>({
    message: "",
    file: null,
  });

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement;
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    if (inputElement.files === null) return;
    setInput({
      ...input,
      file: inputElement.files[0],
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form className=" flex gap-1 bg-gray-300 p-1" onSubmit={handleSubmit}>
      <input
        type="text"
        name="message"
        placeholder="enter your message"
        className="w-full rounded-md p-1 text-left"
        value={input.message}
        onChange={onInputChange}
      />
      <span className="flex items-center">
        <BiImageAdd size="28" />
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={onInputChange}
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
