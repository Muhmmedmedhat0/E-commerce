import React from 'react';
import { categories } from './data';
import style from '../../styles/Home/Categories.module.css';
import CategorieItem from './CategorieItem';

function Categories() {
  return (
    <section className={style.container}>
      {categories.map((item) => (
        <CategorieItem item={item} key={item.id} />
      ))}
    </section>
  );
}

export default Categories;
