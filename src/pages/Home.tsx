import React from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import ChatContext, { IChatContext } from "../context//ChatContext";
import { useSize } from "../helpers/useSize";
import { Footer } from "../components/Additional/Footer";
import { cn } from "../lib/utils";

const Home: React.FC = () => {
  const { state } = React.useContext(ChatContext) as IChatContext;
  const { innerHeight } = useSize();
  const isSidebar = state.isSidebar;

  return (
    <>
      <main
        className={cn(
          "m-auto flex max-h-full w-auto max-w-6xl justify-center overflow-hidden rounded-xl shadow-xl shadow-slate-400",
          {
            "h-[520px]": innerHeight <= 601,
            "h-[600px]": innerHeight >= 667,
            "h-[680px]": innerHeight > 735,
            "h-[700px]": innerHeight > 767,
          }
        )}
      >
        {isSidebar && <Sidebar />}
        <Chat />
      </main>
      <Footer />
    </>
  );
};

export default Home;
