import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import style from "../styles/Products/Product.module.css";

function SingleProduct(props) {
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.imgContainer}>
          <img
            loading="lazy"
            width="100"
            height="90"
            className={style.Image}
            src={props.products?.img}
            alt={props.products?.title}
          />
        </div>
        <div className={style.infoContainer}>
          <h1 className={style.infoTitle}>{props.products?.title}</h1>
          <div className={style.infoDescription}>
            {props.products?.description}
          </div>
          <span className={style.infoPrice}>{props.products?.price} $</span>
          <div className={style.filterContainer}>
            <div className={style.filter}>
              <span className={style.filterTitle}>color</span>
              {props.products?.color?.map((c) => (
                <div
                  onClick={() => props.setColor(c)}
                  key={c}
                  className={style.filterColor}
                  style={{ backgroundColor: `${c}` }}></div>
              ))}
            </div>
            <div className={style.filter}>
              <span className={style.filterTitle}>size</span>
              <select
                onChange={(e) => props.setSize(e.target.value)}
                className={style.filterSize}
                name="sizes"
                id="sizes"
                defaultValue={"DEFAULT"}>
                <option disabled value="DEFAULT">
                  choase
                </option>
                {props.products?.size?.map((s) => (
                  <option key={s} value={`${s}`}>
                    {" "}
                    {s}{" "}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={style.addToCart}>
            <div className={style.amountContainer}>
              <FontAwesomeIcon
                icon={faMinus}
                className={style.icon}
                onClick={() => props.handleQuantity("dec")}
              />
              <span className={style.amount}>{props.quantity}</span>
              <FontAwesomeIcon
                icon={faPlus}
                className={style.icon}
                onClick={() => props.handleQuantity("inc")}
              />
            </div>
            <button
              className={style.addToCartButton}
              onClick={props.handleCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
