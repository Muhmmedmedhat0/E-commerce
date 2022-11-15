import React, { useState } from "react";

import { logIn } from "../../app/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Navbar from "../../components/Home/Navbar";
import Login from "../../components/Login";

function SignIn() {
  const { userInfo, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const info = { email, password };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logIn(info));
  };
  // const router = useRouter();
  // (function RedirectToHome() {
  //   if (userInfo && userInfo !== null && !userInfo.message) {
  //     router.push("/");
  //   }
  // })();
  return (
    <>
      <Navbar />
      <Login
        setEmail={setEmail}
        setPassword={setPassword}
        userInfo={userInfo}
        handleClick={handleClick}
        loading={loading}
      />
    </>
  );
}

export default SignIn;
