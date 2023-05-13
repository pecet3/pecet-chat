import React from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { BiImageAdd, BiCheck } from "react-icons/bi";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import AuthContext, { IAuthContext } from "../context/AuthContext";

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
  file: File | null;
}

const EditProfile: React.FC = () => {
  const colors = [
    { name: "red", value: "bg-red-500" },
    { name: "blue", value: "bg-blue-500" },
    { name: "yellow", value: "bg-yellow-500" },
    { name: "pink", value: "bg-pink-400" },
    { name: "purple", value: "bg-purple-500" },
    { name: "orange", value: "bg-orange-500" },
    { name: "green", value: "bg-green-500" },
    { name: "black", value: "bg-black" },
    { name: "white", value: "bg-white" },
  ];

  const [userColor, setUserColor] = React.useState(
    colors[colors.length - 2].value
  );
  const [input, setInput] = React.useState<IRegisterData>({
    email: "",
    password: "",
    name: "",
    file: null,
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const { user } = React.useContext(AuthContext) as IAuthContext;

  const navigate = useNavigate();

  const registerOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<IRegisterData | void> => {
    e.preventDefault();

    try {
      if (user === null) return;
      if (input.file === null || input.file === undefined) {
      } else {
        const storageRef = ref(storage, `${input.name}_${nanoid()}`);
        await uploadBytesResumable(storageRef, input.file);

        await getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(auth.currentUser as User, {
            displayName: input.name,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName: input.name,
            email: user.email,
            photoURL: downloadURL,
            color: userColor,
          });
        });
        navigate("/");
      }
    } catch (err: any) {
      setErrorMessage(err.code);
    }
  };

  return (
    <>
      <Header />
      <form className="form flex-col" onSubmit={handleSubmit}>
        <legend className="legend">Edit your profile</legend>
        <input
          type="text"
          className="inputElement"
          name="name"
          minLength={3}
          maxLength={16}
          value={input.name}
          placeholder="Name"
          onChange={registerOnChange}
        />
        <input
          type="file"
          name="file"
          id="filee"
          className="hidden"
          onChange={registerOnChange}
        />
        <label
          htmlFor="filee"
          className="flex items-center hover:cursor-pointer"
        >
          <BiImageAdd size="32" />
          <p>Change an Avatar</p>
        </label>
        <p>Change your color for the public rooms</p>

        <div className="grid grid-cols-3 gap-1">
          {colors.map((color) => (
            <span
              key={color.name}
              onClick={() => setUserColor(color.value)}
              className={`
              margin-auto
              h-8
              w-8
              rounded-md
              p-2
              hover:cursor-pointer
              ${color.value} ${
                color.name === "black" ? "text-white" : "text-black"
              }
              ${
                color.value === userColor
                  ? "scale-105 rounded-sm opacity-100"
                  : ""
              }
              `}
            >
              {color.value === userColor && <BiCheck size="16" className="" />}
            </span>
          ))}
        </div>

        <button className="submitButton px-6">Update</button>
        <span>
          <p className="text-red-700 underline">
            <Link to="/">Cancel</Link>
          </p>
        </span>
      </form>
      <p>{errorMessage !== "" && errorMessage}</p>
    </>
  );
};

export default EditProfile;
