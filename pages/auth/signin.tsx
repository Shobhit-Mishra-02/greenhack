import { AiOutlineGoogle } from "react-icons/ai";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { auth } from "../../firebase/lib";
import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

const googleProvider = new GoogleAuthProvider();

const SignInPage: NextPage = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  const authenticateUser = () => {
    if (userInfo.email.length && userInfo.password.length) {
      signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          router.push("/");
        })
        .catch((error) => {
          const errorMessage = error.message;
          console.log(errorMessage);
        });
    }
  };

  const authenticateUserWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        router.push("/");
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className="w-full pt-20 md:pt-32 flex justify-center align-middle items-center pb-20">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          authenticateUser();
        }}
        className="w-fit px-2 py-4 rounded-md shadow-lg border"
      >
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
            <div className="pt-8">
              <button
                type="submit"
                className="py-1 text-xl text-white bg-green-500 rounded-md w-full hover:bg-green-600"
              >
                Sign in
              </button>
            </div>
            <div className="flex justify-center align-middle items-center">
              <Link href={"/auth/signup"}>
                <a className="text-green-500 underline text-center pt-2 cursor-pointer ">
                  create an account
                </a>
              </Link>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={authenticateUserWithGoogle}
              className="py-1 text-xl text-green-500 border border-green-500 rounded-md w-full"
            >
              <AiOutlineGoogle className="w-8 h-8 mx-auto" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
