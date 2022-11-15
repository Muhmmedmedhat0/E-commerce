import React from "react";
import loader from "../../public/images/loader.svg";
import Image from "next/image";
function Loading() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <Image src={loader} alt="loader" />
      </div>
    </>
  );
}

export default Loading;
