import React from "react";

import Link from "next/link";
import style from "../styles/Register/Register.module.css";

function Login(props) {
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>SIGN IN</h1>
        <form action="" className={style.form}>
          <input
            required={true}
            type="email"
            autoComplete="true"
            placeholder="email"
            className={style.input}
            onChange={(e) => props.setEmail(e.target.value)}
          />
          <input
            required={true}
            type="password"
            autoComplete="true"
            placeholder="password"
            className={style.input}
            onChange={(e) => props.setPassword(e.target.value)}
          />
          <span className={style.agrement}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          {props.userInfo ? (
            <span className={style.error}>{props.userInfo.message}</span>
          ) : (
            ""
          )}
          <button
            className={style.button}
            disabled={props.loading}
            onClick={props.handleClick}>
            LOG IN
          </button>
          <Link className={style.link} href="/register">
            CREATE A NEW ACCOUNT
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
