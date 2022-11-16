import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../app/slices/products";

import style from "../../styles/Home/Products.module.css";

function ProductList({ category, filters, sort }) {
  const [filterProducts, setFilteredProducts] = useState([]);
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const router = useRouter();

  // fetch products by category
  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [dispatch, category]);

  // change products when filters apply
  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((product) =>
          Object.entries(filters).every(([key, value]) =>
            product[key].includes(value),
          ),
        ),
      );
  }, [products, category, filters]);

  // sort products
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt),
      );
    } else if (sort === "ascending") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price),
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price),
      );
    }
  }, [sort]);
  return (
    <>
      {router.asPath === "/" ? (
        <div className={style.latest}>
          <h1>Latest Arrival</h1>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
        </div>
      ) : null}
      {/* 
      if category render filterProducts
      else render 12  products in homepage
       */}
      <section className={style.container}>
        {category ? (
          filterProducts.length === 0 ? (
            <h1 style={{ textAlign: "center", color: "red" }}>
              Thers's no items
            </h1>
          ) : (
            filterProducts.map((product) => (
              <Product
                category={category}
                key={product._id}
                product={product}
                loading={loading}
                error={error}
              />
            ))
          )
        ) : (
          Array.from(products)
            .slice(0, 12)
            .map((product) => (
              <Product
                key={product._id}
                product={product}
                loading={loading}
                error={error}
              />
            ))
        )}
      </section>
    </>
  );
}

export default ProductList;
