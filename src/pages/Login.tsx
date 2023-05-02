import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import Context, { IContext } from "../context/AuthContext";

export interface ILoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = React.useState("");

  const { setUser } = React.useContext(Context) as IContext;

  const navigate = useNavigate();

  const loginOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<ILoginData | void> => {
    e.preventDefault();
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        loginInput.email,
        loginInput.password
      );
      setUser(response.user);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <legend>Log In here!</legend>
        <input
          type="text"
          className="inputElement"
          name="email"
          value={loginInput.email}
          placeholder="Enter your email"
          onChange={loginOnChange}
          required={true}
        />
        <input
          type="password"
          name="password"
          className="inputElement"
          value={loginInput.password}
          placeholder="password"
          onChange={loginOnChange}
          // pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          required={true}
        />

        <button className="submitButton bg-teal-500 px-6">Sign In</button>
        <span>
          Don't have an account?
          <p className="text-blue-700 underline">
            <Link to="/register">Register Here</Link>
          </p>
        </span>
      </form>
      <p>{errorMessage !== "" && errorMessage}</p>
    </>
  );
};

export default Login;
