import React from "react";

const Register: React.FC = () => {
  const [registerInput, setRegisterInput] = React.useState({
    email: "",
    password: "",
    name: "",
  });

  const registerOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRegisterInput({
      ...registerInput,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form className="form">
      <legend>Register here!</legend>
      <input
        type="text"
        className="inputElement"
        name="name"
        maxLength={16}
        value={registerInput.name}
        placeholder="Enter your name..."
        onChange={registerOnChange}
      />
      <input
        type="text"
        className="inputElement"
        name="email"
        value={registerInput.email}
        placeholder="Enter your email"
        onChange={registerOnChange}
        required={true}
      />
      <input
        type="password"
        name="password"
        className="inputElement"
        value={registerInput.password}
        placeholder="password"
        onChange={registerOnChange}
        pattern="(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
        required={true}
      />
      <label htmlFor="file">
        <span>Add an avatar</span>
      </label>
      <button className="submitButton bg-teal-500 px-6">Register</button>
    </form>
  );
};

export default Register;
