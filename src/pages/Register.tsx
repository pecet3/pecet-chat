import React from "react";
import { BiImageAdd } from "react-icons/bi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

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
      return alert("Avatar is required");

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        registerInput.email,
        registerInput.password
      );
      console.log(response);
    } catch (err) {
      alert(err);
    }
  };

  React.useEffect(() => {
    console.log(registerInput);
  }, [registerInput]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <legend>Register here!</legend>
      <input
        type="text"
        className="inputElement"
        name="name"
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
        pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
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
  );
};

export default Register;
