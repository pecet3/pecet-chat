import React from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  DocumentData,
  updateDoc,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import Context, { IAuthContext } from "../../context/AuthContext";

const PublicRooms: React.FC = () => {
  const [room, setRoom] = React.useState("room1");
  const [findedUser, setFindedUser] = React.useState<DocumentData | null>(null);
  const { user } = React.useContext(Context) as IAuthContext;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.currentTarget.value);
  };

  return (
    <>
      <div className="mt-1 flex justify-center gap-2">
        <select value={room} onChange={handleChange} className="rounded-md">
          <option value="room1">#room1</option>
          <option value="room2">#room2</option>
          <option value="room3">#room3</option>
        </select>
        <button className="submitButton">Enter</button>
      </div>
    </>
  );
};

export default PublicRooms;
