import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import style from '../../styles/Home/NewsLetter.module.css';

function NewsLetter() {
  return (
    <section className={style.container}>
      <h1 className={style.title}>NewsLetter</h1>
      <div className={style.description}>
        Get timely updates from your favorite products.
      </div>
      <div className={style.inputContainer}>
        <input
          className={style.input}
          type="text"
          placeholder="Enter your email"
        />
        <button className={style.button}>
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </section>
  );
}

export default NewsLetter;
