import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../../components/Home/Navbar";
import Rigister from "../../components/Rigister";

function Register() {
  const { userInfo, loading } = useSelector((state) => state.user);
  return (
    <>
      <Navbar />
      <Rigister />
    </>
  );
}

export default Register;
