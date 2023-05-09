import React from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebaseConfig";
import { Link } from "react-router-dom";
import AuthContext, { IAuthContext } from "../context/AuthContext";
import Header from "../components/Header";

export interface IRegisterData {
  email: string;
  password: string;
  name: string;
  file: File | null;
}

const Register: React.FC = () => {
  const [registerInput, setRegisterInput] = React.useState<IRegisterData>({
    email: "",
    password: "",
    name: "",
    file: null,
  });
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState("");

  const registerOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const inputElement = e.target as HTMLInputElement;
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });

    if (inputElement.files === null) return;
    setRegisterInput({
      ...registerInput,
      file: inputElement.files[0],
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<IRegisterData | void> => {
    e.preventDefault();

    if (registerInput.file === null || undefined)
      return setErrorMessage("Avatar is required");

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        registerInput.email,
        registerInput.password
      );

      const storageRef = ref(storage, `${registerInput.name}_${nanoid()}`);
      await uploadBytesResumable(storageRef, registerInput.file);

      await getDownloadURL(storageRef).then(async (downloadURL) => {
        await updateProfile(response.user, {
          displayName: registerInput.name,
          photoURL: downloadURL,
        });
        await setDoc(doc(db, "users", response.user.uid), {
          uid: response.user.uid,
          displayName: response.user.displayName,
          email: response.user.email,
          photoURL: downloadURL,
        });

        await setDoc(doc(db, "userChats", response.user.uid), {});
      });
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code);
    }
  };
  return (
    <>
      <Header />
      <form className="form" onSubmit={handleSubmit}>
        <legend className="legend">Enter your register data</legend>
        <input
          type="text"
          className="inputElement"
          name="name"
          minLength={3}
          maxLength={16}
          value={registerInput.name}
          placeholder="Name"
          onChange={registerOnChange}
        />
        <input
          type="email"
          className="inputElement"
          name="email"
          value={registerInput.email}
          placeholder="Email"
          onChange={registerOnChange}
          required={true}
          minLength={5}
        />
        <input
          type="password"
          name="password"
          className="inputElement"
          value={registerInput.password}
          placeholder="Password"
          onChange={registerOnChange}
          minLength={6}
          // pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          required={true}
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
          <p>Add an Avatar</p>
        </label>
        <button className="submitButton  px-6">Sign up</button>
        <span>
          Do you have an account?
          <p className="text-blue-700 underline">
            <Link to="/login">Login Here</Link>
          </p>
        </span>
      </form>
      <p>{errorMessage !== "" && errorMessage}</p>
    </>
  );
};

export default Register;
