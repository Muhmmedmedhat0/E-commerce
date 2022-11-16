import React, { useState } from "react";
import { register } from "../../app/slices/user";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const Navbar = dynamic(() => import("../../components/Home/Navbar"), {
  suspense: true,
});
const Rigister = dynamic(() => import("../../components/Rigister"), {
  suspense: true,
});
import Loading from "../../components/Loading/Loading";

function Register() {
  const { userInfo, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const info = { userName, email, password };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(register(info));
    if (userInfo.message) {
      console.log(userInfo.message._message);
    }
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
      <Rigister
        setUserName={setUserName}
        setEmail={setEmail}
        setPassword={setPassword}
        handleClick={handleClick}
        loading={loading}
        userInfo={userInfo}
      />
    </Suspense>
  );
}

export default Register;
