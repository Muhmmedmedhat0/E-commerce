import dynamic from "next/dynamic";
import { Suspense } from "react";
import Loading from "../components/Loading/Loading";

const Annoucement = dynamic(() => import("../components/Home/Annoucement"), {
  suspense: true,
});

const Categories = dynamic(() => import("../components/Home/Categories"), {
  suspense: true,
});
const Footer = dynamic(() => import("../components/Home/Footer"), {
  suspense: true,
});
const Navbar = dynamic(() => import("../components/Home/Navbar"), {
  suspense: true,
});
const NewsLetter = dynamic(() => import("../components/Home/NewsLetter"), {
  suspense: true,
});
const ProductList = dynamic(() => import("../components/Home/ProductList"), {
  suspense: true,
});
const Slider = dynamic(() => import("../components/Home/Slider"), {
  suspense: true,
});

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Annoucement />
      <Navbar />
      <Slider />
      <Categories />
      <ProductList />
      <NewsLetter />
      <Footer />
    </Suspense>
  );
}
