import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import Context, { IAuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Cookies from "universal-cookie";

const cookies = new Cookies();

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

  const [rememberMe, setRememberMe] = React.useState(false);

  const { setUser, info } = React.useContext(Context) as IAuthContext;

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
      rememberMe && cookies.set("auth-token", response.user.refreshToken);
      navigate("/");
    } catch (err: any) {
      setErrorMessage(err.code);
    }
  };

  return (
    <>
      <Header />
      {info && <p className="my-6 text-xl text-violet-700">{info}</p>}
      <form className="form" onSubmit={handleSubmit}>
        <legend className="legend">Enter your login data</legend>
        <input
          type="email"
          className="inputElement"
          name="email"
          value={loginInput.email}
          placeholder="Email"
          onChange={loginOnChange}
          required={true}
        />
        <input
          type="password"
          name="password"
          className="inputElement"
          value={loginInput.password}
          placeholder="Password"
          onChange={loginOnChange}
          // pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
          required={true}
        />
        <span className="flex gap-2">
          <input
            type="checkbox"
            name="rememberMe"
            id="rememberMe"
            onChange={() => setRememberMe((prev) => (prev = !prev))}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </span>
        <button className="submitButton px-6">Sign In</button>
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
