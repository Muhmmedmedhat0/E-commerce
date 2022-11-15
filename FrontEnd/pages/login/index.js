import React, { useState } from "react";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { logIn } from "../../app/slices/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
const Navbar = dynamic(() => import("../../components/Home/Navbar"), {
  suspense: true,
});
const Login = dynamic(() => import("../../components/Login"), {
  suspense: true,
});
import Loading from "../../components/Loading/Loading";

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
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Login
        setEmail={setEmail}
        setPassword={setPassword}
        userInfo={userInfo}
        handleClick={handleClick}
        loading={loading}
      />
    </Suspense>
  );
}

export default SignIn;
