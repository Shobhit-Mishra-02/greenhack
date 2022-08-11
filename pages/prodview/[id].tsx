import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const ProductViewPage = () => {
  return (
    <div className="px-1 pt-6 sm:pt-12 md:pt-16 lg:pt-24 pb-3 flex flex-wrap justify-center sm:justify-evenly items-center">
      <div className="aspect-square bg-gray-400 w-full rounded-md max-w-sm"></div>
      <div className="w-full max-w-sm lg:max-w-md xl:max-w-xl">
        <h2 className="text-3xl text-gray-500 lg:text-4xl">Product name.</h2>
        <h3 className="text-xl lg:text-2xl text-gray-400 pb-4">$10</h3>

        <p className="text-gray-500 pt-6">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Error
          dolorum dolorem a quod modi odit optio nostrum, veniam qui aliquam
          numquam accusantium exercitationem reprehenderit explicabo vero nihil
          consequatur harum totam. Lorem ipsum, dolor sit amet consectetur
          adipisicing elit. Eaque esse architecto, officiis nesciunt odio
          eligendi voluptatem tempora quae porro maxime vel repudiandae neque,
          culpa, repellat natus veniam vero quisquam eveniet.
        </p>

        <div>
          <div className="flex justify-center w-fit items-center align-middle mt-8 mb-4">
            <span className="bg-gray-300 rounded-l-md px-2 py-1 cursor-pointer">
              <AiOutlineMinus className="text-gray-500 w-6 h-6" />
            </span>
            <span className="text-xl text-gray-500 px-4 py-1">3</span>
            <span className="bg-gray-300 rounded-r-md px-2 py-1 cursor-pointer">
              <AiOutlinePlus className="text-gray-500 w-6 h-6" />
            </span>
          </div>

          <button className="text-xl text-green-500 border border-green-500 rounded-md px-4 py-1 hover:bg-green-500 hover:text-white mr-4">
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
