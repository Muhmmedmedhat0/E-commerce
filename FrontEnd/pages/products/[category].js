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
const Footer = dynamic(() => import("../../components/Home/Footer"), {
  suspense: true,
});

import style from "../../styles/Products/ProductFilter.module.css";

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
   <Suspense fallback={`Loading...`}>
    <section>
      <Annoucement />
      <Navbar />
      <div className={style.container}>
        <h1 className={style.title}>{category}</h1>
        <div className={style.filterContainer}>
          <div className={style.filter}>
            <span className={style.filterText}>Filter Products</span>
            <select className={style.select} name="color" id="color" defaultValue={'DEFAULT'} onChange={handleFilter}>
              <option className={style.option} value="DEFAULT" disabled>Color</option>
              <option className={style.option} value="white">White</option>
              <option className={style.option} value="black">Black</option>
              <option className={style.option} value="red">Red</option>
              <option className={style.option} value="blue">Blue</option>
              <option className={style.option} value="yellow">Yellow</option>
              <option className={style.option} value="green">Green</option>
            </select>
            <select className={style.select} name="size" id="size" defaultValue={'DEFAULT'} onChange={handleFilter}>
              <option className={style.option} value="DEFAULT" disabled>Sizes</option>
              <option className={style.option} value="xs">XS</option>
              <option className={style.option} value="s">S</option>
              <option className={style.option} value="m">M</option>
              <option className={style.option} value="l">L</option>
              <option className={style.option} value="xl">XL</option>
            </select>
          </div>
          <div className={style.filter}>
            <span className={style.filterText}>Sort Products</span>
            <select className={style.select} name="sort" id="sort" defaultValue={'DEFAULT'} onChange={handleSort}>
              <option className={style.option} value="newest">Newest</option>
              <option className={style.option} value="ascending">Price (ascending)</option>
              <option className={style.option} value="descending">Price (descending)</option>
            </select>
          </div>
        </div>
      </div>
      <ProductList category={category} filters={filters} sort={sort} />
      <NewsLetter />
      <Footer />
    </section>
   </Suspense>
  );
}
export default Category;
