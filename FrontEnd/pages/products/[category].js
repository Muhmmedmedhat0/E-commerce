import React, { useState } from "react";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useRouter } from "next/router";
const Navbar = dynamic(() => import("../../components/Home/Navbar"), {
  suspense: true,
});
const Annoucement = dynamic(() => import("../../components/Home/Annoucement"), {
  suspense: true,
});
const NewsLetter = dynamic(() => import("../../components/Home/NewsLetter"), {
  suspense: true,
});
const ProductList = dynamic(() => import("../../components/Home/ProductList"), {
  suspense: true,
});
const Filter = dynamic(() => import("../../components/Filter"), {
  suspense: true,
});
const Footer = dynamic(() => import("../../components/Home/Footer"), {
  suspense: true,
});
import Loading from "../../components/Loading/Loading";


function Category() {
  // get the pathname from the router
  const router = useRouter();
  const { category } = router.query;

  const [filters, setFilters] = useState({});
  const handleFilter = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFilters({ ...filters, [name]: value });
  };
  // console.log(filters);
  const [sort, setSort] = useState('newest');
  const handleSort = (e) => {
    setSort(e.target.value);
  };
  // console.log(sort);
  return (
    <Suspense fallback={<Loading/>}>
        <section>
          <Annoucement />
          <Navbar />
          <Filter handleFilter = {handleFilter} handleSort={handleSort} category={category}/>
          <ProductList category={category} filters={filters} sort={sort} />
          <NewsLetter />
          <Footer />
        </section>
    </Suspense>
  );
}
export default Category;
