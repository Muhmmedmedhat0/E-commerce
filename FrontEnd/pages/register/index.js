import React from "react";
import { useSelector } from "react-redux";
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
  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Rigister />
    </Suspense>
  );
}

export default Register;
