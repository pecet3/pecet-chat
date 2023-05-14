import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { app } from "../firebaseConfig";

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
      await sendPasswordResetEmail(email);
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
        <form onSubmit={handleResetPassword}>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Adres e-mail"
            required
          />
          <button type="submit">Resetuj hasło</button>
          {error && <p>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default PasswordReset;
