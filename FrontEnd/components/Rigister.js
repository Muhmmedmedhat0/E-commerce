import React from "react";
import Link from "next/link";
import style from "../styles/Register/Register.module.css";

function Rigister(props) {
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>CREATE AN ACCOUNT</h1>
        <form className={style.form}>
          <label htmlFor="name" />
          <input
            type="text"
            id="name"
            name="name"
            required={true}
            placeholder="name"
            className={style.input}
            onChange={(e) => props.setUserName(e.target.value)}
          />
          {/* <input type="text" placeholder="last name" className={style.input} /> */}
          <label htmlFor="email" />
          <input
            type="email"
            id="email"
            name="email"
            required={true}
            placeholder="email"
            className={style.input}
            onChange={(e) => props.setEmail(e.target.value)}
          />
          <label htmlFor="password" />

          <input
            type="password"
            id="password"
            name="password"
            required={true}
            placeholder="password"
            className={style.input}
            onChange={(e) => props.setPassword(e.target.value)}
          />
          <input
            required={true}
            type="password"
            placeholder="confirm password"
            className={style.input}
          />
          <span className={style.agrement}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>

          {props.userInfo.message ? (
            <span className={style.error}>
              {props.userInfo.message._message}
            </span>
          ) : null}
          <button
            disabled={props.loading}
            className={style.button}
            onClick={props.handleClick}>
            CREATE ACCOUNT
          </button>
          <span>Do you have an account try to</span>
          <Link className={style.link} href="/login">
            Login In
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Rigister;
