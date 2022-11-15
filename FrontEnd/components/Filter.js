import React from 'react'

import style from "../styles/Products/ProductFilter.module.css";

function Filter(props) {
	return (
		<div className={style.container}>
        <h1 className={style.title}>{props.category}</h1>
        <div className={style.filterContainer}>
          <div className={style.filter}>
            <span className={style.filterText}>Filter Products</span>
            <select className={style.select} name="color" id="color" defaultValue={'DEFAULT'} onChange={props.handleFilter}>
              <option className={style.option} value="DEFAULT" disabled>Color</option>
              <option className={style.option} value="white">White</option>
              <option className={style.option} value="black">Black</option>
              <option className={style.option} value="red">Red</option>
              <option className={style.option} value="blue">Blue</option>
              <option className={style.option} value="yellow">Yellow</option>
              <option className={style.option} value="green">Green</option>
            </select>
            <select className={style.select} name="size" id="size" defaultValue={'DEFAULT'} onChange={props.handleFilter}>
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
            <select className={style.select} name="sort" id="sort" defaultValue={'DEFAULT'} onChange={props.handleSort}>
              <option className={style.option} value="newest">Newest</option>
              <option className={style.option} value="ascending">Price (ascending)</option>
              <option className={style.option} value="descending">Price (descending)</option>
            </select>
          </div>
        </div>
      </div>
	)
}

export default Filter