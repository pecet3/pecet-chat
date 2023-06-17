import React from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { BiImageAdd, BiCheck } from "react-icons/bi";
import {
  updateProfile,
  User,
  updatePassword,
  updateEmail,
  signOut,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebase";
import { Link } from "react-router-dom";
import Header from "../components/Additional/Header";
import AuthContext, { IAuthContext } from "../context/AuthContext";
import { Footer } from "../components/Additional/Footer";

export interface IEditData {
  email: string;
  password: string;
  name: string;
  file: File | null;
}

const EditProfile: React.FC = () => {
  const colors = [
    { name: "red", value: "red-500" },
    { name: "blue", value: "blue-500" },
    { name: "yellow", value: "yellow-500" },
    { name: "pink", value: "pink-400" },
    { name: "purple", value: "purple-500" },
    { name: "orange", value: "orange-500" },
    { name: "green", value: "green-500" },
    { name: "black", value: "black" },
    { name: "white", value: "white" },
  ];

  const [userColor, setUserColor] = React.useState<Promise<any> | string>(
    "black"
  );
  const [input, setInput] = React.useState<IEditData>({
    email: "",
    password: "",
    name: "",
    file: null,
  });
  const [errorMessage, setErrorMessage] = React.useState("");

  const { user } = React.useContext(AuthContext) as IAuthContext;

  const navigate = useNavigate();

  React.useEffect(() => {
    const getUserColor = async () => {
      if (user === null) return;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      const color = docSnap.data();
      return setUserColor(color?.color);
    };
    getUserColor();
  }, []);

  const elementOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
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
  ): Promise<IEditData | void> => {
    e.preventDefault();

    try {
      if (user === null) return;
      if (input.password !== "" || input.email !== "") {
        const user = auth.currentUser;
        if (!user) return;
        if (input.password !== "") await updatePassword(user, input.password);
        else if (input.email !== "") await updateEmail(user, input.email);
        signOut(auth);
      }

      if (input.file === null || input.file === undefined) {
        await updateProfile(auth.currentUser as User, {
          displayName: input.name.trim() === "" ? user.displayName : input.name,
        });
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: input.name.trim() === "" ? user.displayName : input.name,
          email: user.email,
          color: userColor || "black",
          photoURL: user.photoURL,
        });
      } else if (input.file !== null) {
        const storageRef = ref(storage, `${input.name}_${nanoid()}`);
        await uploadBytesResumable(storageRef, input.file);

        await getDownloadURL(storageRef).then(async (downloadURL) => {
          await updateProfile(auth.currentUser as User, {
            displayName:
              input.name.trim() === "" ? user.displayName : input.name,
            photoURL: downloadURL,
          });
          await setDoc(doc(db, "users", user.uid), {
            uid: user.uid,
            displayName:
              input.name.trim() === "" ? user.displayName : input.name,
            email: user.email,
            photoURL: downloadURL,
            color: userColor,
          });
        });
      }
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code);
    }
  };

  return (
    <>
      <Header />
      <form className="form max-w-md flex-col" onSubmit={handleSubmit}>
        <legend className="legend my-1 text-2xl">Edit your profile</legend>
        <div className="grid md:grid-cols-2">
          <div className="m-4 flex flex-col gap-2">
            <input
              type="text"
              className="inputElement"
              name="name"
              minLength={3}
              maxLength={24}
              value={input.name}
              placeholder={`Name: ${user!.displayName}`}
              onChange={elementOnChange}
            />
            <input
              type="email"
              className="inputElement"
              name="email"
              minLength={3}
              maxLength={16}
              value={input.email}
              placeholder={`Email: ${user!.email}`}
              onChange={elementOnChange}
            />
            <input
              type="password"
              name="password"
              className="inputElement"
              value={input.password}
              placeholder="Password"
              onChange={elementOnChange}
              minLength={6}
              // pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
            />
            <input
              type="file"
              name="file"
              id="filee"
              className="hidden"
              onChange={elementOnChange}
            />
          </div>
          <div className="flex flex-col items-center gap-2 rounded-md border border-gray-700 p-2">
            <img
              src={user!.photoURL || ""}
              alt="your photo"
              className="h-16 w-16 rounded-full shadow-lg shadow-gray-500"
            />
            <label
              htmlFor="filee"
              className="flex flex-col items-center hover:cursor-pointer"
            >
              <BiImageAdd size="32" />
              <p>Change an Avatar</p>
            </label>
          </div>
        </div>
        <p className="mx-4 text-sm">Change color for the public rooms</p>

        <div className="grid grid-cols-3 gap-1">
          {colors.map((color) => (
            <span
              key={color.name}
              onClick={() => setUserColor(color.value)}
              //color.name was generated by gpt because issues with updating tailwind colors

              className={`
              margin-auto
              h-8
              w-8
              rounded-md
              p-2
              shadow-md
              hover:cursor-pointer
              bg-${color.value} ${
                color.name === "black" ? "text-white" : "text-black"
              }
              ${color.name === "black" && "bg-black"}
              ${color.name === "white" && "bg-white"}
              ${color.name === "red" && "bg-red-500"}
              ${color.name === "blue" && "bg-blue-500"}
              ${color.name === "green" && "bg-green-500"}
              ${color.name === "yellow" && "bg-yellow-500"}
              ${color.name === "pink" && "bg-pink-400"}
              ${color.name === "purple" && "bg-purple-500"}
              ${color.name === "orange" && "bg-orange-500"}
              ${color.value === userColor ? "scale-105" : ""}
              `}
            >
              {color.value === userColor && <BiCheck size="16" className="" />}
            </span>
          ))}
        </div>
        <button className="submitButton mt-6 px-6 ring-2 ring-indigo-800">
          Update
        </button>
        <span>
          <p className="text-red-700 underline">
            <Link to="/">Cancel</Link>
          </p>
        </span>
      </form>
      <p>{errorMessage !== "" && errorMessage}</p>
      <Footer />
    </>
  );
};

export default EditProfile;
