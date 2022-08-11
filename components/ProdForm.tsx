import { FiX } from "react-icons/fi";
import { BsCardImage } from "react-icons/bs";
import { NextPage } from "next";
import { Dispatch, SetStateAction } from "react";

const ProdForm: NextPage<{
  setOpenStatus: Dispatch<SetStateAction<boolean>>;
}> = ({ setOpenStatus }) => {
  return (
    <div className="fixed top-0 bottom-0 w-full z-10">
      <div className="w-full h-full bg-gray-500 opacity-30 absolute -z-10"></div>
      <div className="flex justify-center align-middle items-center h-screen">
        <div className="w-fit bg-white rounded-md shadow-lg border">
          <div className="flex justify-end pt-4 pb-6 px-4">
            <FiX
              className="w-6 h-6 text-gray-500 cursor-pointer"
              onClick={() => setOpenStatus(false)}
            />
          </div>
          <h2 className="text-3xl md:text-4xl text-center">Product form</h2>

          <div className="space-y-3 px-2 pb-4 pt-8">
            <div className="flex flex-col">
              <label htmlFor="name">Product name</label>
              <input
                type="text"
                name="name"
                id="name"
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                name="price"
                id="price"
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="image">Add image</label>
              <div className="relative w-[300px] md:w-[400px] h-[60px] rounded-md border-dashed border-2 border-gray-500">
                <div className="absolute top-0 bottom-0 w-full flex justify-center align-middle items-center">
                  <BsCardImage className="w-6 h-6 text-gray-400" />
                </div>

                <input
                  className="opacity-0 h-full w-full"
                  type="file"
                  name="image"
                  id="image"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                id="desc"
                cols={30}
                rows={5}
                className="w-[300px] md:w-[400px] px-2 py-1 rounded-md border border-gray-400"
              ></textarea>
            </div>
            <div className="pt-6">
              <button className="px-4 py-1 text-xl text-white bg-blue-500 rounded-md hover:bg-blue-600">
                Add product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdForm;
