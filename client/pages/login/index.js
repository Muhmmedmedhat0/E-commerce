import React, {useState} from 'react';
import Link from 'next/link';
import style from '../../styles/Login/Login.module.css';
import { logIn } from '../../app/slices/user';
import { useDispatch, useSelector} from 'react-redux';
import { useRouter } from 'next/router';

function Login() {
  const { userInfo, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const info = { email, password };
  const handleClick = (e) => {
    e.preventDefault(); 
    dispatch(logIn(info));
  }
  const router = useRouter();
  (function RedirectToHome() {
    if (userInfo && userInfo !== null && !userInfo.message) {
      router.push('/')
    } 
  })()
  return (
    <section className={style.container}>
      <div className={style.wrapper}>
        <h1 className={style.title}>SIGN IN</h1>
        <form action="" className={style.form}>
          <input required={true} type="email" autoComplete='true' placeholder="email" className={style.input}  onChange={(e)=> setEmail(e.target.value)}/>
          <input required={true} type="password" autoComplete='true' placeholder="password" className={style.input} onChange={(e)=> setPassword(e.target.value)}/>
          <span className={style.agrement}>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </span>
          {userInfo ? <span className={style.error}>{userInfo.message}</span> : ''}
          <button className={style.button} disabled={loading} onClick={handleClick}>LOG IN</button>
          <Link className={style.link} href="/register">CREATE A NEW ACCOUNT</Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
