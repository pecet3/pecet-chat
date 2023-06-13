import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import Context, { IAuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { TbMessageCircle } from "react-icons/tb";
import { BsList } from "react-icons/bs";
import ChatContext, { IChatContext } from "../../context/ChatContext";
const cookies = new Cookies();

const Navbar: React.FC = () => {
  const { user } = React.useContext(Context) as IAuthContext;
  const { state, dispatch } = React.useContext(ChatContext) as IChatContext;

  const isSidebar = state.isSidebar;

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth);
    cookies.remove("auth-token");
    navigate("/login");
  };

  const handleOnSidebar = () => {
    dispatch({ type: "TOGGLE_SIDEBAR", payload: {} });
  };
  return (
    <>
      <nav className="flex flex-col bg-slate-700 p-2 text-gray-200">
        <div className="mx-6 flex justify-between md:mx-0">
          <span className="flex">
            <h1 className="font-bold">pecetChat</h1>
            <TbMessageCircle size="18" className="ml-[2px]" />
          </span>
          {isSidebar ? (
            <button className="flex sm:hidden" onClick={handleOnSidebar}>
              <BsList size="28" className="text-gray-200" />
            </button>
          ) : null}
        </div>
        <div className="flex justify-between">
          {user && (
            <span className="flex gap-1">
              <img
                src={user.photoURL ? user.photoURL : ""}
                className="h-6 w-6 rounded-full"
              />
              <p>{user.displayName}</p>
            </span>
          )}
          <span className="flex gap-1">
            <button className="rounded-md bg-blue-300 px-1 text-xs text-slate-900 transition-all duration-200 hover:rounded-lg">
              <Link to="/editProfile">Edit a Profile</Link>
            </button>
            <button
              className="justify- rounded-md bg-slate-300 px-1 text-xs text-slate-900 transition-all duration-200 hover:rounded-lg"
              onClick={handleLogout}
            >
              Log Out
            </button>
          </span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
