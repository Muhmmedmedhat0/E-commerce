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
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (values) => {
    dispatch(logIn(values));
    router.push("/");
  };
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Login handleSubmit={handleSubmit} />
    </Suspense>
  );
}

export default SignIn;
