import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Additional/Header";

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isResetSent, setIsResetSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setIsResetSent(true);
      setError("");
    } catch (error: any) {
      setError(error.message.toString());
      setIsResetSent(false);
    }
  };

  return (
    <div>
      {isResetSent ? (
        <p className="my-10 text-2xl">
          Email with link to reset the password has been sent.
        </p>
      ) : (
        <>
          <Header />
          <form onSubmit={handleResetPassword} className="form max-w-sm">
            <legend className="text-sm">
              Don't worry if you forgot a password. Enter your email adress,
              then We send mail with link to reset the password.
            </legend>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="email address"
              required
              className="inputElement"
            />
            <button type="submit" className="submitButton">
              Send me an email
            </button>
            <Link to="/" className="text-red-700 underline">
              Cancel
            </Link>
            {error && <p>{error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
