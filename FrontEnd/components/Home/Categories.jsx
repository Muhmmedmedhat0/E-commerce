import React from "react";

import { categories } from "./data";
import CategorieItem from "./CategorieItem";
import style from "../../styles/Home/Categories.module.css";

function Categories() {
  return (
    <>
      <div className={style.latest}>
        <h1>Main Categories</h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <section className={style.container}>
        {categories.map((item) => (
          <CategorieItem item={item} key={item.id} />
        ))}
      </section>
    </>
  );
}

export default Categories;
