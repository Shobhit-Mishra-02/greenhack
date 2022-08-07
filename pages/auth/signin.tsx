import { AiOutlineGoogle } from "react-icons/ai";
import { NextPage } from "next";

const SignInPage: NextPage = () => {
  return (
    <div className="w-full pt-32 flex justify-center align-middle items-center">
      <div className="w-fit px-2 py-4 rounded-md shadow-lg border">
        <h2 className="text-4xl text-center pb-14 text-gray-600">Sign in</h2>
        <div className="divide-y-2 space-y-4">
          <div>
            <div className="flex flex-col justify-start">
              <label htmlFor="email" className="text-gray-500">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-[300px] focus:outline-none border border-gray-400 rounded-md px-2 py-1"
              />
            </div>
            <div className="flex flex-col justify-start pt-2">
              <label htmlFor="password" className="text-gray-500">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-[300px] focus:outline-none border border-gray-400 rounded-md px-2 py-1"
              />
            </div>
            <div className="pt-8">
              <button className="py-1 text-xl text-white bg-blue-500 rounded-md w-full hover:bg-blue-600">
                Sign in
              </button>
            </div>
            <h2 className="text-blue-500 underline text-center pt-2 cursor-pointer ">
              create an account
            </h2>
          </div>

          <div className="pt-4">
            <button className="py-1 text-xl text-blue-500 border border-blue-500 rounded-md w-full">
              <AiOutlineGoogle className="w-8 h-8 mx-auto" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
