import React, { useState } from 'react';
import './login.css';
import { logIn } from '../../app/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Login() {
  const dispatch = useDispatch();
  const { userInfo, loading } = useSelector((state) => state.user);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const info = { email, password };
  const navigate = useNavigate();
  function handleClick(e) {
    e.preventDefault();
    dispatch(logIn(info));
  }
  useEffect(() => {
    (function RedirectToHome() {
      if (userInfo && userInfo !== null && !userInfo.message) {
        navigate('/');
      }
    })();
  }, [navigate, userInfo]);

  return (
    <section className="login">
      <input
        type="email"
        autoComplete="true"
        placeholder="email"
        required={true}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        required={true}
        onChange={(e) => setPassword(e.target.value)}
      />
      {userInfo ? <span className="error">{userInfo.message}</span> : ''}
      <button onClick={handleClick} disabled={loading}>
        {' '}
        Login{' '}
      </button>
    </section>
  );
}

export default Login;
