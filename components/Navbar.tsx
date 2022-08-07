import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isOpen, setOpenStatus] = useState<boolean>(false);

  return (
    <>
      {/* navbar for small device */}
      <div className="z-10 relative sm:hidden">
        <div className="px-2 py-3 flex justify-between align-middle items-center bg-blue-500">
          <h3 className="text-3xl font-semibold">Logo.</h3>
          {isOpen ? (
            <FiX className="w-8 h-8" onClick={() => setOpenStatus(false)} />
          ) : (
            <FiMenu className="w-8 h-8" onClick={() => setOpenStatus(true)} />
          )}
        </div>

        <div
          className={`absolute list-none text-xl space-y-1 shadow-lg pb-2 pt-2 divide-y-2 bg-blue-500 divide-blue-600 ${
            !isOpen && "-translate-y-full"
          } -z-10 w-full transition-all ease-in-out px-2`}
        >
          <li className="px-1">Home</li>
          <li className="px-1">Cart</li>
          <li className="px-1">Login</li>
        </div>
      </div>

      {/* navbar for big devices */}
      <div className="hidden sm:block">
        <h2>Logo.</h2>

        <div></div>
      </div>
    </>
  );
};

export default Navbar;
