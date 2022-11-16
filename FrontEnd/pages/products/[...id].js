import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useRouter } from "next/router";
import { fetchProduct } from "../../app/slices/products";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../app/slices/cart";

const Navbar = dynamic(() => import("../../components/Home/Navbar"), {
  suspense: true,
});
const Annoucement = dynamic(() => import("../../components/Home/Annoucement"), {
  suspense: true,
});

const NewsLetter = dynamic(() => import("../../components/Home/NewsLetter"), {
  suspense: true,
});

const SingleProduct = dynamic(() => import("../../components/SingleProduct"), {
  suspense: true,
});
const Footer = dynamic(() => import("../../components/Home/Footer"), {
  suspense: true,
});
import Loading from "../../components/Loading/Loading";

function Product() {
  // get the pathname from the router
  const router = useRouter();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const id = router.asPath.split("/")[3];
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };
  const handleCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...products, quantity, color, size }));
  };
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [id]);
  return (
    <Suspense fallback={<Loading />}>
      <Annoucement />
      <Navbar />
      <SingleProduct
        quantity={quantity}
        products={products}
        handleQuantity={handleQuantity}
        handleCart={handleCart}
        setColor={setColor}
        setSize={setSize}
      />
      <NewsLetter />
      <Footer />
    </Suspense>
  );
}

export default Product;
