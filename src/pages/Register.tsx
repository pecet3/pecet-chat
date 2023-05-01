import React from "react";
import { useNavigate } from "react-router-dom";
import { BiImageAdd } from "react-icons/bi";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { auth, storage, db } from "../firebaseConfig";
import Context, { IContext } from "../AuthContext";

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
  const { setUser } = React.useContext(Context) as IContext;

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

      const storageRef = ref(storage, registerInput.name);
      const uploadTask = uploadBytesResumable(storageRef, registerInput.file);
      uploadTask.on("state_changed", () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
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

          await setDoc(doc(db, "usersChat", response.user.uid), {});
        });
      });
      setUser(response.user);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code);
    }
  };
  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <legend>Register here!</legend>
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
          type="text"
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
        <label htmlFor="filee" className="flex items-center">
          <BiImageAdd size="32" />
          <p>Add an Avatar</p>
        </label>
        <button className="submitButton bg-teal-500 px-6">Register</button>
      </form>
      <p>{errorMessage !== "" && errorMessage}</p>
    </>
  );
};

export default Register;
