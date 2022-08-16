/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

type propsType = {
  adminCard: boolean;
  productName: string;
  productImageUrl: string;
  productPrice: string;
  id: string;
};

const Card: React.FC<propsType> = ({
  adminCard = false,
  productName,
  productImageUrl,
  productPrice,
  id,
}) => {
  return (
    <div className="w-[300px] rounded-md shadow-xl m-2">
      <img
        src={productImageUrl}
        alt={"img"}
        className="w-full h-[300px] rounded-t-md bg-gray-400"
      />
      <div className="px-1 pb-2">
        <h2 className="text-3xl pt-2 text-gray-500 hover:text-gray-600 cursor-pointer">
          {productName}
        </h2>
        <h3 className="text-xl text-gray-400 pb-4">${productPrice}</h3>

        {adminCard ? (
          <div className="flex justify-end space-x-2">
            <button className="text-xl text-red-500 rounded-md px-4 py-1 hover:text-white hover:bg-red-500 border border-red-500">
              Remove
            </button>
            <Link href={`/prodview/${id}`}>
              <a className="text-xl text-white bg-green-500 rounded-md px-4 py-1 hover:bg-green-600">
                Buy now
              </a>
            </Link>
          </div>
        ) : (
          <div className="flex justify-end">
            <Link href={`/prodview/${id}`}>
              <a className="text-xl text-white bg-green-500 rounded-md px-4 py-1 hover:bg-green-600">
                Buy now
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
