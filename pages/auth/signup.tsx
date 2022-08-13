import { NextPage } from "next";
import Link from "next/link";
import { auth } from "../../firebase/lib";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";

const SignUpPage: NextPage = () => {
  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const createUser = () => {
    if (userInfo.password === userInfo.confirmPassword) {
      createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log(user);
          router.push("/auth/signin");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  return (
    <div className="w-full pt-32 flex justify-center align-middle items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createUser();
        }}
        className="w-fit px-2 py-4 rounded-md shadow-lg border"
      >
        <h2 className="text-4xl text-center pb-14 text-gray-600">Sign up</h2>
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
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                  })
                }
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
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    password: e.target.value,
                  })
                }
                className="w-[300px] focus:outline-none border border-gray-400 rounded-md px-2 py-1"
              />
            </div>
            <div className="flex flex-col justify-start pt-2">
              <label htmlFor="confPasswd" className="text-gray-500">
                Confirm password
              </label>
              <input
                type="password"
                name="confPasswd"
                id="confPasswd"
                value={userInfo.confirmPassword}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    confirmPassword: e.target.value,
                  })
                }
                className="w-[300px] focus:outline-none border border-gray-400 rounded-md px-2 py-1"
              />
            </div>
            <div className="pt-8">
              <button
                type="submit"
                className="py-1 text-xl text-white bg-green-500 rounded-md w-full hover:bg-green-600"
              >
                Sign up
              </button>
            </div>
            <div className="flex justify-center align-middle items-center">
              <Link href={"/auth/signin"}>
                <a className="text-green-500 underline text-center pt-2 cursor-pointer ">
                  already have an account
                </a>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
