import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faPinterestP,
} from '@fortawesome/free-brands-svg-icons';
import { faMap, faPhone, faVoicemail } from '@fortawesome/free-solid-svg-icons';
import style from '../../styles/Home/Footer.module.css';

function Footer() {
  return (
    <section className={style.container}>
      <div className={style.left}>
        <h1 className={style.logo}>
          <Link href="/">Logo</Link>
        </h1>
        <p className={style.description}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
        <div className={style.socialContainer}>
          <div className={style.socialIcon} style={{ color: '#3B5999' }}>
            <FontAwesomeIcon icon={faFacebookF} />
          </div>
          <div className={style.socialIcon} style={{ color: '#E4405F' }}>
            <FontAwesomeIcon icon={faInstagram} />
          </div>
          <div className={style.socialIcon} style={{ color: '#55ACEE' }}>
            <FontAwesomeIcon icon={faTwitter} />
          </div>
          <div className={style.socialIcon} style={{ color: '#E60023' }}>
            <FontAwesomeIcon icon={faPinterestP} />
          </div>
        </div>
      </div>
      <div className={style.center}>
        <h3 className={style.title}>Useful Links</h3>
        <ul className={style.list}>
          <li className={style.listItem}>Home</li>
          <li className={style.listItem}>Cart</li>
          <li className={style.listItem}>Man Fashion</li>
          <li className={style.listItem}>Woman Fashion</li>
          <li className={style.listItem}>Accessories</li>
          <li className={style.listItem}>My Account</li>
          <li className={style.listItem}>Order Tracking</li>
          <li className={style.listItem}>Wishlist</li>
          <li className={style.listItem}>Terms</li>
          <li className={style.listItem}>Privacy Policy</li>
        </ul>
      </div>
      <div className={style.right}>
        <h3 className={style.title}>Contact Us</h3>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faMap} />
          &nbsp;&nbsp;123 Main St.
        </div>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faPhone} />
          &nbsp;&nbsp;+201098014450
        </div>
        <div className={style.contactItem}>
          <FontAwesomeIcon icon={faVoicemail} />
          &nbsp;&nbsp;@admin.com
        </div>
        <img
          className={style.payment}
          src="https://i.ibb.co/Qfvn4z6/payment.png"
          alt="payment"
        />
      </div>
    </section>
  );
}

export default Footer;
