import React from 'react';
import Link from 'next/link';
import style from '../../styles/Register/Register.module.css';

function Register() {
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>CREATE AN ACCOUNT</h1>
        <form action="" className={style.form}>
          <input type="text" placeholder="name" className={style.input} />
          <input type="text" placeholder="last name" className={style.input} />
          <input type="text" placeholder="username" className={style.input} />
          <input type="email" placeholder="email" className={style.input} />
          <input
            type="password"
            placeholder="password"
            className={style.input}
          />
          <input
            type="password"
            placeholder="confirm password"
            className={style.input}
          />
          <span className={style.agrement}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          <button className={style.button}>CREATE ACCOUNT</button>
          <span>Do you have an account try to</span>
          <Link className={style.link} href="/login">
            Login In
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Register;
