import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import Cart from "./Cart";
import Order from "./Order";

const Navbar: React.FC = () => {
  const [isOpen, setOpenStatus] = useState<boolean>(false);
  const [isCart, setCartStatus] = useState<boolean>(false);
  const [isOrder, setOrderStatus] = useState<boolean>(false);

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
          <li className="px-1" onClick={() => setCartStatus(true)}>
            Cart
          </li>
          <li className="px-1" onClick={() => setOrderStatus(true)}>
            Order
          </li>
          <li className="px-1">Login</li>
        </div>
      </div>

      {/* navbar for big devices */}
      <div className="hidden sm:block">
        <div className="flex justify-between align-middle items-center px-4 py-4 bg-blue-500 md:px-6 lg:px-12">
          <h2 className="text-2xl font-semibold lg:text-3xl cursor-pointer hover:text-gray-700">
            Logo.
          </h2>

          <div className="flex justify-center align-middle items-center space-x-6 md:space-x-6">
            <AiOutlineShoppingCart
              className="w-8 h-8 hover:text-gray-700 cursor-pointer"
              onClick={() => setCartStatus(true)}
            />

            <button
              className="text-xl text-white bg-orange-500 rounded-md px-4 py-1 hover:bg-orange-600"
              onClick={() => setOrderStatus(true)}
            >
              Orders
            </button>
            <button className="text-xl text-white bg-orange-500 rounded-md px-4 py-1 hover:bg-orange-600">
              Login
            </button>
          </div>
        </div>
      </div>

      {/* cart component */}
      {isCart && <Cart setCartStatus={setCartStatus} />}
      {isOrder && <Order setOrderStatus={setOrderStatus} />}
    </>
  );
};

export default Navbar;
