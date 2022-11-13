import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Annoucement from '../../components/Home/Annoucement';
import Footer from '../../components/Home/Footer';
import Navbar from '../../components/Home/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import style from '../../styles/Cart/Cart.module.css';
import { useSelector } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
function Cart() {
  const cart = useSelector((state) => state.cart);
  const STRIPE_KEY =
    'pk_test_51LPnilHHab9eHCh35EPRzuze8DtBPdSOBK1wTI0wU60WmRTYsSKkKn6Tn7QcCf6vO4bpmf6DP1QAInbJIIsS8j7C00TxRuv3Wf';
  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => setStripeToken(token);
  const router = useRouter();
  // send token to backend
  useEffect(() => {
    const makeRequest = async () => {
      try {
        const response = await axios.post(`http://localhost:8080/api/payment/`, {
          amount: cart.totalPrice * 100, token: stripeToken.id,
        });
        console.log(response.data);
        // router.push('/')
        return response.data;
      } catch (error) {console.log(error);}
    };
    // call the function
    stripeToken && makeRequest();
  }, [stripeToken, cart.totalPrice, router]);
  return (
    <section>
      <Navbar />
      <Annoucement />
      <div className={style.wrapper}>
        <h1 className={style.title}>YOUR BAG</h1>
        <div className={style.top}>
          <button style={{ backgroundColor: 'transparent', color: 'black' }} className={style.topButton} >
            <Link href="#">CONTINUE SHOPPING</Link>
          </button>
          <div className={style.topTexts}>
            <span className={style.topText}>Shopping Bag(2)</span>
            <span className={style.topText}>Your Wishlist (0)</span>
          </div>
          <StripeCheckout name="E-Commerce"
              image="https://img.freepik.com/free-vector/supermarket-logo-concept_23-2148467758.jpg?w=740&t=st=1659300159~exp=1659300759~hmac=75c6925c2fe434a8d477161f0cac8b5b8eeae3680a66178d4cb78f5c15ad95b4"
              billingAddress shippingAddress
              description={` your total price is ${cart.totalPrice}`}
              amount={cart.totalPrice * 100}
              token={onToken}
              stripeKey={STRIPE_KEY}>
              <button style={{ border: 'none', backgroundColor: 'black', color: 'white' }} className={style.topButton} >
                CHECKOUT NOW
              </button>
            </StripeCheckout>
        </div>
        <div className={style.bottom}>
          <div className={style.info}>
            {/* start second Product */}
            {cart.products.map((product) => (
              <div className={style.product} key={product._id}>
                <div className={style.productDetails}>
                  <img className={style.productImage} src={product.img} alt={product.title} />
                  <div className={style.details}>
                    <span className={style.productName}> <b>Product:</b> {product.title} </span>
                    <span className={style.ProductId}> <b>ID:</b> {product._id} </span>
                    <div className={style.ProductColor} style={{ backgroundColor: `${product.color}` }} ></div>
                    <span className={style.ProductSize}><b>Size:</b> {product.size}</span>
                  </div>
                </div>
                <div className={style.pricetDetails}>
                  <div className={style.productAmountContainer}>
                    <FontAwesomeIcon icon={faMinus} className={style.icon} />
                    <span className={style.amount}>{product.quantity}</span>
                    <FontAwesomeIcon icon={faPlus} className={style.icon} />
                  </div>
                  <span className={style.productPrice}>
                    <b>${product.price * product.quantity}</b>
                  </span>
                </div>
              </div>
            ))}
            {/* end OF Product */}
          </div>
          {/* start summery */}
          <div className={style.summery}>
            <h1 className={style.summeryTitle}>ORDER SUMMARY</h1>
            <div className={style.summeryItem}>
              <span className={style.summeryText}>Subtotal</span>
              <span className={style.summeryPrice}>$ {cart.totalPrice}</span>
            </div>
            <div className={style.summeryItem}>
              <span className={style.summeryText}>Estimated Shipping</span>
              <span className={style.summeryPrice}>$ 5.90</span>
            </div>
            <div className={style.summeryItem}>
              <span className={style.summeryText}>Shipping Discount</span>
              <span className={style.summeryPrice}>$ -5.90</span>
            </div>
            <div className={style.summeryItem}>
              <span className={(style.summeryText, style.summeryTotal)}>Total</span>
              <span className={style.summeryPrice}>$ {cart.totalPrice}</span>
            </div>
            <StripeCheckout name="E-Commerce"
              image="https://img.freepik.com/free-vector/supermarket-logo-concept_23-2148467758.jpg?w=740&t=st=1659300159~exp=1659300759~hmac=75c6925c2fe434a8d477161f0cac8b5b8eeae3680a66178d4cb78f5c15ad95b4"
              billingAddress shippingAddress
              description={` your total price is ${cart.totalPrice}`}
              amount={cart.totalPrice * 100}
              token={onToken}
              stripeKey={STRIPE_KEY}>
              <button className={style.checkNow}>CHECKOUT NOW</button>
            </StripeCheckout>
          </div>
          {/* end summery */}
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Cart;
