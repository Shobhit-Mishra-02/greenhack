import { AiOutlineReload } from "react-icons/ai";

const Loader = () => {
  return (
    <div className="fixed top-0 bottom-0 w-full">
      <div className="w-full h-screen flex justify-center align-middle items-center">
        <AiOutlineReload className="w-8 h-8 text-green-500 animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
