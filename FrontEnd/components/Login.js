import React from "react";

import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import Link from "next/link";
import style from "../styles/Register/Register.module.css";

function Login(props) {
  
  const validationSchema = () => {
    let schema = yup.object().shape({
      email: yup.string().email("invalid email").required("required"),
      password: yup.string().min(4, "too short!").max(15, "too long!").required("required"),
    });
    return schema;
  };
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>SIGN IN</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={props.handleSubmit}
          validationSchema={validationSchema}>
            {({errors, touched})=>(
              <Form action="" className={style.form}>
              <Field type="email" name="email" placeholder="email" className={style.input} />
              <div className={style.errorContainer}>{touched.email && errors.email && <span className= {style.error}>{errors.email}</span>}</div>
              <Field type="password" name="password" placeholder="password" className={style.input} />
              <div className={style.errorContainer}>{touched.password && errors.password && <span className= {style.error}>{errors.password}</span>}</div>
              <span className={style.agrement}>
                By creating an account, I consent to the processing of my personal
                data in accordance with the <b>PRIVACY POLICY</b>
              </span>
              <button type='submit' className={style.button}>LOG IN</button>
              <Link className={style.link} href="/register">CREATE A NEW ACCOUNT</Link>
            </Form>
            )}
          </Formik>
      </div>
    </section>
  );
}

export default Login;
