import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdAttachFile } from "react-icons/md";
import { updateDoc, doc, arrayUnion, Timestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import ChatContext, { IChatContext } from "../context/ChatContext";
import AuthContext, { IAuthContext } from "../context/AuthContext";
import { nanoid } from "nanoid";

export type TInput = {
  message: string;
  file: null | File;
};

const Input: React.FC = () => {
  const [input, setInput] = React.useState<TInput>({
    message: "",
    file: null,
  });

  const { state } = React.useContext(ChatContext) as IChatContext;
  const { user } = React.useContext(AuthContext) as IAuthContext;

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.file !== null) {
    } else {
      await updateDoc(doc(db, "chats", state.chatId), {
        messages: arrayUnion({
          id: nanoid(),
          message: input.message,
          senderId: user?.uid,
          date: Timestamp.now(),
        }),
      });
    }
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
