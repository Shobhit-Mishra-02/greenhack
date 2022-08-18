/* eslint-disable @next/next/no-img-element */
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { db } from "../../firebase/lib";
import { getDoc, doc, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import useAuth from "../../components/hooks/authHook";

interface prodInterface {
  productName: string;
  productPrice: number;
  productDesc: string;
  productImageUrl: string;
}

interface CartInterface {
  productName: string;
  totalPrice: number;
  quantity: number;
  email: string;
}

const ProductViewPage = ({
  id,
  product,
}: {
  id: string;
  product: prodInterface;
}) => {
  const [amount, setAmount] = useState(1);

  const { isUser, userInfo } = useAuth();

  const addToCard = async () => {
    if (isUser) {
      const cartProductInfo: CartInterface = {
        productName: product.productName,
        totalPrice: amount * product.productPrice,
        quantity: amount,
        email: userInfo.email as string,
      };
      const collectionRef = collection(db, "Cart");
      const dataRef = await addDoc(collectionRef, cartProductInfo);
      console.log(dataRef.id);
    }
  };

  const incrementAmount = () => {
    if (amount < 10) {
      setAmount(amount + 1);
    }
  };

  const decrementAmount = () => {
    if (amount >= 2) {
      setAmount(amount - 1);
    }
  };

  return (
    <div className="px-1 pt-6 sm:pt-12 md:pt-16 lg:pt-24 pb-3 flex flex-wrap justify-center sm:justify-evenly items-center">
      <img
        src={product?.productImageUrl}
        alt="img"
        className="aspect-square bg-gray-400 w-full rounded-md max-w-sm"
      />
      <div className="w-full max-w-sm lg:max-w-md xl:max-w-xl">
        <h2 className="text-3xl text-gray-500 lg:text-4xl">
          {product?.productName}
        </h2>
        <h3 className="text-xl lg:text-2xl text-gray-400 pb-4">
          ${product?.productPrice.toString()}
        </h3>

        <p className="text-gray-500 pt-6">{product?.productDesc}</p>

        <div>
          <div className="flex justify-center w-fit items-center align-middle mt-8 mb-4">
            <span className="bg-gray-300 rounded-l-md px-2 py-1 cursor-pointer">
              <AiOutlineMinus
                onClick={() => decrementAmount()}
                className="text-gray-500 w-6 h-6"
              />
            </span>
            <span className="text-xl text-gray-500 px-4 py-1">{amount}</span>
            <span className="bg-gray-300 rounded-r-md px-2 py-1 cursor-pointer">
              <AiOutlinePlus
                onClick={() => incrementAmount()}
                className="text-gray-500 w-6 h-6"
              />
            </span>
          </div>

          <button
            className="text-xl text-green-500 border border-green-500 rounded-md px-4 py-1 hover:bg-green-500 hover:text-white mr-4"
            onClick={addToCard}
          >
            Add to cart
          </button>
          <button className="text-xl text-white bg-green-500 rounded-md px-6 py-1 hover:bg-green-600 mt-2">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  interface customParsedUrlQuery extends ParsedUrlQuery {
    id: string;
  }

  const { id } = params as customParsedUrlQuery;
  const documentRef = doc(db, "Products", id);
  const product = (await (await getDoc(documentRef)).data()) as prodInterface;
  // console.log(product);
  return {
    props: { product },
  };
};
