const Card: React.FC = () => {
  return (
    <div className="w-[300px] rounded-md shadow-xl m-2">
      <div className="w-full h-[300px] rounded-t-md bg-gray-400"></div>
      <div className="px-1 pb-2">
        <h2 className="text-3xl pt-2 text-gray-500 hover:text-gray-600 cursor-pointer">
          Card title
        </h2>
        <h3 className="text-xl text-gray-400 pb-4">$10</h3>
        <div className="flex justify-end">
          <button className="text-xl text-white bg-blue-500 rounded-md px-4 py-1 hover:bg-blue-600">
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
