import { FiX } from "react-icons/fi";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { db } from "../firebase/lib";
import useAuth from "./hooks/authHook";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

interface OrderInterface {
  id: string;
  email: string;
  grandTotal: number;
  products: { productName: string; totalPrice: number }[];
}

const Order: NextPage<{
  setOrderStatus: Dispatch<SetStateAction<boolean>>;
}> = ({ setOrderStatus }) => {
  const { isUser, userInfo } = useAuth();
  const [orderList, setOrderList] = useState([] as OrderInterface[]);

  const getOrders = async () => {
    if (isUser) {
      console.log("inside func");
      const orderCollectionRef = collection(db, "Order");
      const q = query(orderCollectionRef, where("email", "==", userInfo.email));
      const orders = await getDocs(q);

      let temp: OrderInterface[] = [];

      orders.forEach((order) => {
        temp.push({
          ...order.data(),
          id: order.id,
        } as OrderInterface);
      });

      // console.log(temp);
      setOrderList(temp);
      console.log(orderList);
    }
  };

  const removeOrder = async (id: string) => {
    const docRef = doc(db, "Order", id);
    await deleteDoc(docRef);

    getOrders();
  };

  useEffect(() => {
    getOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUser]);

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
            {orderList.length ? (
              orderList.map((order) => (
                <div key={order.id} className="w-full px-1 pb-2 pt-1">
                  {order.products.map((prod) => (
                    <div
                      key={prod.productName}
                      className="flex justify-between items-center align-middle"
                    >
                      <h2 className="text-2xl text-gray-500">
                        {prod.productName}
                      </h2>
                      <h2 className="text-gray-500 pt-2 text-xl">
                        ${prod.totalPrice}
                      </h2>
                    </div>
                  ))}

                  <div className="flex justify-between align-middle pt-4 pb-4">
                    <h2 className="text-xl text-gray-700">Grand total</h2>
                    <h2 className="text-xl text-gray-700">
                      ${order.grandTotal}
                    </h2>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => removeOrder(order.id)}
                      className="text-xl text-red-500 border border-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-white"
                    >
                      Cancel order
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-full flex justify-center text-4xl font-semibold text-gray-400">
                Buy something!!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
