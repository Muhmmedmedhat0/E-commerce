import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import axios from "axios";

const Navbar = dynamic(() => import("../../components/Home/Navbar"), {
  suspense: true,
});
const Annoucement = dynamic(() => import("../../components/Home/Annoucement"), {
  suspense: true,
});
const Checkout = dynamic(() => import("../../components/Checkout"), {
  suspense: true,
});
const Footer = dynamic(() => import("../../components/Home/Footer"), {
  suspense: true,
});
import Loading from "../../components/Loading/Loading";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => setStripeToken(token);
  const stripeKey = "pk_test_51LPnilHHab9eHCh35EPRzuze8DtBPdSOBK1wTI0wU60WmRTYsSKkKn6Tn7QcCf6vO4bpmf6DP1QAInbJIIsS8j7C00TxRuv3Wf";

  // send token to backend
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/payment/`,
          {
            amount: cart.totalPrice * 100,
            token: stripeToken.id,
          },
        );
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
  };
    // call the function
    stripeToken && makeRequest();
  }, [stripeToken, cart.totalPrice]);

  return (
    <Suspense fallback={<Loading />}>
      <Navbar />
      <Annoucement />
      <Checkout cart={cart} onToken={(token) => {onToken(token)}} stripeKey = {stripeKey} />
      <Footer />
    </Suspense>
  );
}

export default Cart;
