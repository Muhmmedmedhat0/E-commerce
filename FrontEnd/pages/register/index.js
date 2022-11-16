import React from "react";
import { register } from "../../app/slices/user";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const router = useRouter();
  const handleSubmit = (values) => {
    dispatch(register(values));
    router.push("/login");
  };

  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Rigister handleSubmit={handleSubmit} />
    </Suspense>
  );
}

export default Register;
