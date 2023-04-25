import React from "react";

const Login: React.FC = () => {
  const [loginInput, setLoginInput] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const loginOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="form">
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
        pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
        required={true}
      />

      <button className="submitButton bg-teal-500 px-6">Sign In</button>
      <p>Don't Have an Account? Register here</p>
    </form>
  );
};

export default Login;