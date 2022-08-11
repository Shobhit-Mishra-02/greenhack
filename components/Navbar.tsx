import { FiMenu, FiX } from "react-icons/fi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useState } from "react";
import Cart from "./Cart";
import Order from "./Order";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [isOpen, setOpenStatus] = useState<boolean>(false);
  const [isCart, setCartStatus] = useState<boolean>(false);
  const [isOrder, setOrderStatus] = useState<boolean>(false);

  return (
    <>
      {/* navbar for small device */}
      <div className="z-10 relative sm:hidden">
        <div className="px-2 py-3 flex justify-between align-middle items-center bg-green-500">
          <Link href={"/"}>
            <h3 className="text-3xl font-semibold">Logo.</h3>
          </Link>
          {isOpen ? (
            <FiX className="w-8 h-8" onClick={() => setOpenStatus(false)} />
          ) : (
            <FiMenu className="w-8 h-8" onClick={() => setOpenStatus(true)} />
          )}
        </div>

        <div
          className={`absolute list-none text-xl space-y-1 shadow-lg pb-2 pt-2 divide-y-2 bg-green-500 divide-green-600 ${
            !isOpen && "-translate-y-full"
          } -z-10 w-full transition-all ease-in-out px-2`}
        >
          <div>
            <Link href={"/"}>
              <a className="px-1">Home</a>
            </Link>
          </div>

          <li className="px-1" onClick={() => setCartStatus(true)}>
            Cart
          </li>
          <li className="px-1" onClick={() => setOrderStatus(true)}>
            Order
          </li>
          <div>
            <Link href={"/auth/signin"}>
              <a className="px-1 ">Login</a>
            </Link>
          </div>
        </div>
      </div>

      {/* navbar for big devices */}
      <div className="hidden sm:block">
        <div className="flex justify-between align-middle items-center px-4 py-4 bg-green-500 md:px-6 lg:px-12">
          <Link href={"/"}>
            <a className="text-2xl font-semibold lg:text-3xl cursor-pointer hover:text-gray-700">
              Logo.
            </a>
          </Link>

          <div className="flex justify-center align-middle items-center space-x-6 md:space-x-6">
            <AiOutlineShoppingCart
              className="w-8 h-8 hover:text-gray-700 cursor-pointer"
              onClick={() => setCartStatus(true)}
            />

            <button
              className="text-xl text-white bg-green-700 rounded-md px-4 py-1 hover:bg-green-600"
              onClick={() => setOrderStatus(true)}
            >
              Orders
            </button>
            <Link href={"/auth/signin"}>
              <a className="text-xl text-white bg-green-700 rounded-md px-4 py-1 hover:bg-green-600">
                Login
              </a>
            </Link>
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
