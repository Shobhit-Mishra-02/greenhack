import { FiX } from "react-icons/fi";
import { BsCardImage } from "react-icons/bs";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";
import useAuth from "./hooks/authHook";
import { db } from "../firebase/lib";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  writeBatch,
  addDoc,
  getDoc,
  updateDoc,
  increment,
  setDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

interface CartInterface {
  email: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  id: string;
}

const Cart: React.FC<{
  setCartStatus: Dispatch<SetStateAction<boolean>>;
}> = ({ setCartStatus }) => {
  const [cartProducts, setCartProducts] = useState([] as CartInterface[]);
  // const [grandTotal, setGrandTotal] = useState(0);
  const { isUser, userInfo } = useAuth();

  const getGrandTotal = (): number => {
    if (cartProducts.length) {
      let temp = 0;
      cartProducts.forEach((prod) => {
        temp += prod.totalPrice;
      });

      return temp;
    }

    return 0;
  };

  const addToLeaderboard = async (email: string, amount: number) => {
    const leaderboardDocRef = doc(db, "Leaderboard", email);
    const temp = await getDoc(leaderboardDocRef);

    if (temp.exists()) {
      await updateDoc(leaderboardDocRef, {
        totalAmount: increment(amount),
      });
    } else {
      await setDoc(leaderboardDocRef, {
        totalAmount: amount,
      });
    }
  };

  const getCartInfo = async () => {
    if (isUser) {
      const collectionRef = collection(db, "Cart");
      const q = query(collectionRef, where("email", "==", userInfo?.email));
      const data = await getDocs(q);
      const temp: CartInterface[] = [];

      data.forEach((prod) => {
        const product = {
          id: prod.id,
          ...prod.data(),
        } as CartInterface;

        temp.push(product);
      });

      setCartProducts(temp);
      // console.log(grandTotal);
      console.log(cartProducts);
    }
  };

  const placeOrder = async () => {
    if (isUser && cartProducts.length) {
      let prods: { productName: string; totalPrice: number }[] = [];

      cartProducts.forEach((prod) => {
        prods.push({
          productName: prod.productName,
          totalPrice: prod.totalPrice,
        });
      });

      let orderObject = {
        email: userInfo.email,
        grandTotal: getGrandTotal(),
        products: prods,
      };

      const orderCollectionRef = collection(db, "Order");
      const dataRef = await addDoc(orderCollectionRef, orderObject);
      console.log(dataRef);

      addToLeaderboard(userInfo.email as string, getGrandTotal());

      cartProducts.forEach((prod) => {
        removeCartProduct(prod.id);
      });
    }
  };

  const removeCartProduct = async (id: string) => {
    const docRef = doc(db, "Cart", id);
    const dataRef = await deleteDoc(docRef);
    console.log(dataRef);
    getCartInfo();
  };

  useEffect(() => {
    console.log("working");
    getCartInfo();
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
              onClick={() => setCartStatus(false)}
            />
          </div>
          <h2 className="text-3xl md:text-4xl text-center pb-8">Cart</h2>

          <div className="w-[300px] md:w-[400px] pt-12 divide-y-2 overflow-auto h-[400px]">
            {cartProducts.length ? (
              cartProducts.map((prod) => (
                <div className="w-full px-1 pb-2 pt-1" key={prod?.id}>
                  <div className="flex justify-between items-center align-middle">
                    <h2 className="text-2xl text-gray-700">
                      {prod?.productName}
                    </h2>
                    <h2 className="text-gray-500 pt-2 text-xl">
                      ${prod?.totalPrice}
                    </h2>
                  </div>
                  <h2 className="text-gray-500 text-xl pb-4">
                    Qnt:{prod?.quantity}
                  </h2>
                  <div className="flex justify-end">
                    <button
                      className="text-xl text-red-500 border border-red-500 rounded-md px-4 py-1 hover:bg-red-500 hover:text-white"
                      onClick={() => removeCartProduct(prod.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>nothing to show.</div>
            )}
          </div>

          <div className="flex justify-center py-2">
            <button
              className="text-xl text-white bg-blue-500 px-4 py-1 rounded-md hover:bg-blue-600"
              onClick={placeOrder}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
