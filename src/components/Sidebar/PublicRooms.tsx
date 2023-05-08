import React from "react";
import ChatContext, { IChatContext } from "../../context/ChatContext";

const PublicRooms: React.FC = () => {
  const [room, setRoom] = React.useState("room1");
  const { dispatch } = React.useContext(ChatContext) as IChatContext;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(e.currentTarget.value);
  };

  const handleClick = () => {
    dispatch({ type: "CHANGE_ROOM", payload: { room } });
  };

  return (
    <>
      <div className="mt-1 flex justify-center gap-2">
        <select value={room} onChange={handleChange} className="rounded-md">
          <option value="room1">#room1</option>
          <option value="room2">#room2</option>
          <option value="room3">#room3</option>
        </select>
        <button className="submitButton" onClick={handleClick}>
          Enter
        </button>
      </div>
    </>
  );
};

export default PublicRooms;
