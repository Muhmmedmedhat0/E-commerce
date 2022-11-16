import React from "react";
import Link from "next/link";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";

import style from "../styles/Register/Register.module.css";

function Rigister(props) {
  const validationSchema = () => {
    let schema = yup.object().shape({
      userName: yup
        .string()
        .min(2, "too short!")
        .max(15, "Too Long!")
        .required("required"),
      email: yup.string().email("invalid email").required("required"),
      password: yup
        .string()
        .min(4, "too short!")
        .max(15, "too long!")
        .required("required"),
    });
    return schema;
  };

  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>CREATE AN ACCOUNT</h1>
        <Formik
          initialValues={{ userName: "", email: "", password: "" }}
          onSubmit={props.handleSubmit}
          validationSchema={validationSchema}>
          {({ errors, touched }) => (
            <Form className={style.form}>
              <Field type="text" name="userName" placeholder="userName" className={style.input} />
              <div className={style.errorContainer}>{touched.userName && errors.email && <span className= {style.error}>{errors.userName}</span>}</div>
              <Field type="email" name="email" placeholder="email" className={style.input} />
              <div className={style.errorContainer}>{touched.email && errors.email && <span className= {style.error}>{errors.email}</span>}</div>
              <Field type="password" name="password" placeholder="password" className={style.input} />
              <div className={style.errorContainer}>{touched.password && errors.password && <span className= {style.error}>{errors.password}</span>}</div>
              <span className={style.agrement}>
                By creating an account, I consent to the processing of my
                personal data in accordance with the <b>PRIVACY POLICY</b>
              </span>
              <button type="submit" className={style.button}>
                CREATE ACCOUNT
              </button>
              <span>Do you have an account try to</span>
              <Link className={style.link} href="/login">Login In</Link>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
}

export default Rigister;
