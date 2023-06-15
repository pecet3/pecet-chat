import { useSize } from "../../helpers/useSize";
export const Footer = () => {
  const { innerHeight } = useSize();
  return (
    <footer
      className={`mt-2 font-extralight text-slate-600 md:mt-8 ${
        innerHeight < 670 && "hidden"
      }`}
    >
      developed with ❤ by <b>Jakub Pacewicz</b>, <br />
      <p className="text-xs">version: beta 1.8</p>
    </footer>
  );
};
