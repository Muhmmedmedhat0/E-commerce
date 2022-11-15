import React from "react";

import Link from "next/link";
import style from "../../styles/Home/CategorieItem.module.css";

function CategorieItem({ item }) {
  return (
      <Link href={`/products/${item.category}`}>
        <div className={style.container}>
          <img src={item.img} alt={item.title} className={style.img} />
          <div className={style.info}>
            <h1 className={style.title}>{item.title}</h1>
            <button className={style.button}>SHOP NOW</button>
          </div>
        </div>
      </Link>
  );
}

export default CategorieItem;
