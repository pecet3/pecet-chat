import { TbMessageCircle } from "react-icons/tb";
const Header: React.FC = () => {
  return (
    <header className="m-auto my-4 flex justify-center">
      <h1 className="ml-6 text-3xl">pecetChat</h1>
      <TbMessageCircle size="24" className="self-start text-slate-700" />
      <h2 className="text-sm">beta 1.1</h2>
    </header>
  );
};

export default Header;
