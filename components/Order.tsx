import { FiX } from "react-icons/fi";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";

const Order: NextPage<{
  setOrderStatus: Dispatch<SetStateAction<boolean>>;
}> = ({ setOrderStatus }) => {
  return (
    <div className="fixed top-0 bottom-0 w-full z-10">
      <div className="w-full h-full bg-gray-500 opacity-30 absolute -z-10"></div>
      <div className="flex justify-center align-middle items-center h-screen">
        <div className="w-fit bg-white rounded-md shadow-lg border">
          <div className="flex justify-end pt-4 pb-6 px-4">
            <FiX
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => setOrderStatus(false)}
            />
          </div>
          <h2 className="text-3xl md:text-4xl text-center pb-8">Orders</h2>

          <div className="w-[300px] md:w-[400px] pt-12 divide-y-2 overflow-auto h-[500px]">
            {/* card  */}
            <div className="w-full px-1 pb-2 pt-1">
              <div className="flex justify-between items-center align-middle">
                <h2 className="text-2xl text-gray-700">Product title</h2>
                <h2 className="text-gray-500 pt-2 text-xl">$10</h2>
              </div>

              <h2 className="text-gray-500 text-xl pb-4">Qnt: 3</h2>
              <h2 className="text-gray-500 text-xl pb-4">Total amount: 30</h2>

              <div className="flex justify-end">
                <button className="text-xl text-red-500 border border-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-white">
                  Cancel order
                </button>
              </div>
            </div>
            {/* card end  */}
            <div className="w-full px-1 pb-2 pt-1">
              <div className="flex justify-between items-center align-middle">
                <h2 className="text-2xl text-gray-700">Product title</h2>
                <h2 className="text-gray-500 pt-2 text-xl">$10</h2>
              </div>

              <h2 className="text-gray-500 text-xl pb-4">Qnt: 3</h2>
              <h2 className="text-gray-500 text-xl pb-4">Total amount: 30</h2>

              <div className="flex justify-end">
                <button className="text-xl text-red-500 border border-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-white">
                  Cancel order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
