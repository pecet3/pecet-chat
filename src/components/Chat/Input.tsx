import React from "react";
import { BiImageAdd, BiCloudUpload } from "react-icons/bi";
import {
  updateDoc,
  getDoc,
  doc,
  arrayUnion,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebaseConfig";
import ChatContext, { IChatContext } from "../../context/ChatContext";
import AuthContext, { IAuthContext } from "../../context/AuthContext";
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

  const handlePublicChat = async () => {
    if (!user) return;
    if (input.message.trim() === "" && input.file == null) return;

    if (input.file) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      const storageRef = ref(storage, `${state.room}_${user.uid}_${nanoid()}`);
      await uploadBytesResumable(storageRef, input.file);

      await getDownloadURL(storageRef).then(async (downloadURL) => {
        await updateDoc(doc(db, "publicChats", state.room), {
          messages: arrayUnion({
            id: nanoid(),
            senderId: user.uid,
            text: input.message,
            displayName: user.displayName,
            photoURL: user?.photoURL,
            date: Timestamp.now(),
            img: downloadURL,
            color: docSnap.data()?.color || "black",
          }),
        });
      });
    } else {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      await updateDoc(doc(db, "publicChats", state.room), {
        messages: arrayUnion({
          id: nanoid(),
          senderId: user.uid,
          text: input.message,
          displayName: user.displayName,
          photoURL: user.photoURL,
          date: Timestamp.now(),
          color: docSnap.data()?.color || "black",
        }),
      });
    }
    setInput({
      message: "",
      file: null,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) return;
    if (input.message.trim() === "" && input.file == null) return;

    if (state.isPublic) return handlePublicChat();
    try {
      if (input.file) {
        const storageRef = ref(storage, `${user.uid}_${nanoid()}`);
        await uploadBytesResumable(storageRef, input.file);

        await getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateDoc(doc(db, "chats", state.chatId), {
            messages: arrayUnion({
              id: nanoid(),
              text: input.message,
              senderId: user?.uid,
              date: Timestamp.now(),
              img: downloadURL,
            }),
          });
        });
      } else {
        await updateDoc(doc(db, "chats", state.chatId), {
          messages: arrayUnion({
            id: nanoid(),
            text: input.message,
            senderId: user?.uid,
            date: Timestamp.now(),
          }),
        });
      }
      await updateDoc(doc(db, "userChats", user.uid), {
        [state.chatId + ".lastMessage"]: input.message || "photo",
        [state.chatId + ".date"]: serverTimestamp(),
        [state.chatId + ".userInfo.displayName"]: state.user.displayName,
        [state.chatId + ".userInfo.photoURL"]: state.user.photoURL,
      });

      await updateDoc(doc(db, "userChats", state.user.uid), {
        [state.chatId + ".lastMessage"]: input.message || "photo",
        [state.chatId + ".date"]: serverTimestamp(),
        [state.chatId + ".userInfo.displayName"]: user.displayName,
        [state.chatId + ".userInfo.photoURL"]: user.photoURL,
      });
    } catch (err) {
      alert(err);
    }
    setInput({
      message: "",
      file: null,
    });
  };
  return (
    <>
      <form className=" flex gap-1 bg-gray-300 p-1" onSubmit={handleSubmit}>
        <input
          type="text"
          name="message"
          placeholder="enter your message"
          className="w-full rounded-md p-1 text-left"
          value={input.message}
          onChange={onInputChange}
          disabled={state.chatId === "null" && !state.isPublic}
        />
        <span className="flex items-center">
          <input
            type="file"
            id="file"
            accept="image/*"
            className="hidden"
            onChange={onInputChange}
            disabled={state.chatId === "null" && !state.isPublic}
          />
          <label htmlFor="file" className="hover:cursor-pointer">
            {!input.file ? (
              <BiImageAdd size="32" />
            ) : (
              <p className="w-20 text-xs ">image has been loaded</p>
            )}
          </label>
        </span>
        <button
          className="submitButton w-20"
          disabled={state.chatId === "null" && !state.isPublic}
        >
          Send
        </button>
      </form>
    </>
  );
};

export default Input;
