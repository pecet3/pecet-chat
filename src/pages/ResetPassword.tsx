import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Header from "../components/Header";

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
        <p>
          Wiadomość z instrukcją resetowania hasła została wysłana na podany
          adres e-mail.
        </p>
      ) : (
        <>
          <Header />
          <form onSubmit={handleResetPassword} className="form">
            <p className="text-sm">
              Don't worry if you forgot a password. Write down your email
              adress, then We send mail with link to reset the password.
            </p>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="enter your email address"
              required
              className="inputElement"
            />
            <button type="submit" className="submitButton">
              Send me an email
            </button>
            {error && <p>{error}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default PasswordReset;
