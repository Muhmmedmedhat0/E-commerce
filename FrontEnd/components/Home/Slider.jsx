import React, { useState } from "react";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { sliderItems } from "./data";
import style from "../../styles/Home/Slider.module.css";

function Slider() {
  const [slideindex, setSlideIndex] = useState(1);
  
  function handleClick(direction) {
    if (direction === "left") {
      setSlideIndex(slideindex > 0 ? slideindex - 1 : 2);
    }

    if (direction === "right") {
      setSlideIndex(slideindex < 2 ? slideindex + 1 : 0);
    }
  }
  return (
    <section className={style.container}>
      <div
        className={`${style.arrow} ${style.left}`}
        onClick={() => handleClick("left")}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </div>
      <div
        className={style.wrapper}
        slideindex={slideindex}
        style={{
          transform: `translateX(${slideindex * -100}vw)`,
        }}>
        {sliderItems.map((item) => (
          <div
            className={style.slide}
            key={item.id}
            style={{ backgroundColor: `${item.bg}` }}>
            <div className={style.img_container}>
              <img className={style.Image} src={item.img} alt={item.title} />
            </div>
            <div className={style.info}>
              <h1 className={style.title}>{item.title}</h1>
              <div className={style.description}>{item.desc}</div>
              <button className={style.button}>
                <Link href="#">SHOP NOW</Link>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`${style.arrow} ${style.right}`}
        onClick={() => handleClick("right")}>
        <FontAwesomeIcon icon={faAngleRight} />
      </div>
    </section>
  );
}

export default Slider;
