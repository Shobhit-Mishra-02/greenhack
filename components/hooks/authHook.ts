import { auth } from "../../firebase/lib";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { User } from "firebase/auth";

const useAuth = () => {
  const [isUser, setUserStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({} as User);

  function logout() {
    signOut(auth)
      .then(() => {
        setUserStatus(false);
        setUserInfo({} as User);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserInfo(user);
        setUserStatus(true);
      } else {
        setUserStatus(false);
      }
    });
  }, []);

  return {
    isUser,
    userInfo,
    logout,
  };
};

export default useAuth;
