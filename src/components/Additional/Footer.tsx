import { useSize } from "../../helpers/useSize";
export const Footer = () => {
  const { innerHeight } = useSize();
  return (
    <footer
      className={`mt-2  font-extralight text-slate-600 md:mt-8 ${
        innerHeight < 670 && "hidden"
      }`}
    >
      developed with ❤ by
      <span className=" font-semibold"> Jakub Pacewicz</span>
      <p className="text-xs">version: 1.0</p>
    </footer>
  );
};
